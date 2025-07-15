<?php
// Hotels API Endpoint
global $db;

// Verify database connection
if (!$db) {
    Response::error('Database connection not available', 500);
}

switch ($method) {
    case 'GET':
        if (isset($segments[1])) {
            // Get specific hotel or hotel action
            switch ($segments[1]) {
                case 'featured':
                    // Get featured hotels
                    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
                    try {
                        $hotels = getFeaturedHotels($limit);
                        
                        if ($hotels === false || $hotels === null) {
                            Response::error('Failed to retrieve featured hotels from database', 500);
                        }
                        
                        // Add image URLs
                        foreach ($hotels as &$hotel) {
                            $hotel['image_url'] = getHotelImageUrl($hotel);
                        }
                        
                        Response::success($hotels, 'Featured hotels retrieved successfully');
                    } catch (Exception $e) {
                        error_log('Featured hotels API Error: ' . $e->getMessage());
                        Response::error('Failed to retrieve featured hotels: ' . $e->getMessage());
                    }
                    break;
                    
                case 'count':
                    // Get total hotel count
                    $city = $_GET['city'] ?? '';
                    try {
                        $count = getTotalHotels($city);
                        
                        if ($count === false || $count === null) {
                            $count = 0;
                        }
                        
                        Response::success(['count' => $count], 'Hotel count retrieved successfully');
                    } catch (Exception $e) {
                        error_log('Hotel count API Error: ' . $e->getMessage());
                        Response::error('Failed to retrieve hotel count: ' . $e->getMessage());
                    }
                    break;
                    
                default:
                    // Get specific hotel by ID
                    $hotelId = (int)$segments[1];
                    try {
                        $hotel = getHotelById($hotelId);
                        if (!$hotel) {
                            Response::notFound('Hotel not found');
                        }
                        
                        $hotel['image_url'] = getHotelImageUrl($hotel);
                        Response::success($hotel, 'Hotel retrieved successfully');
                    } catch (Exception $e) {
                        error_log('Hotel API Error: ' . $e->getMessage());
                        Response::error('Failed to retrieve hotel: ' . $e->getMessage());
                    }
            }
        } else {
            // Get hotels with filters and pagination
            $city = $_GET['city'] ?? '';
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 24;
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $offset = ($page - 1) * $limit;

            try {
                $hotels = getHotels($city, $limit, $offset);
                $totalCount = getTotalHotels($city);
                
                if ($hotels === false || $hotels === null) {
                    $hotels = [];
                }
                
                if ($totalCount === false || $totalCount === null) {
                    $totalCount = 0;
                }
                
                // Add image URLs
                foreach ($hotels as &$hotel) {
                    $hotel['image_url'] = getHotelImageUrl($hotel);
                }
                
                Response::paginated($hotels, $totalCount, $page, $limit, 'Hotels retrieved successfully');
                
            } catch (Exception $e) {
                error_log('Hotels API Error: ' . $e->getMessage());
                Response::error('Failed to retrieve hotels: ' . $e->getMessage());
            }
        }
        break;
        
    case 'POST':
        // Create new hotel (admin functionality)
        $input = json_decode(file_get_contents('php://input'), true);
        $validator = Validator::make($input, [
            'name' => 'required|min:2|max:200',
            'city_id' => 'required|numeric',
            'city_name' => 'required|min:2|max:100',
            'rating' => 'required|numeric',
            'price' => 'required|numeric',
            'description' => 'required|min:10|max:1000',
            'amenities' => 'required|min:5'
        ]);
        
        if ($validator->fails()) {
            Response::validation($validator->errors());
        }
        
        $data = $validator->validated();
        
        try {
            $stmt = $db->prepare("INSERT INTO hotels (name, city_id, city_name, rating, price, description, amenities, featured, image_seed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['name'],
                $data['city_id'],
                $data['city_name'],
                $data['rating'],
                $data['price'],
                $data['description'],
                $data['amenities'],
                $data['featured'] ?? 0,
                'hotel_' . time()
            ]);
            
            $hotelId = $db->lastInsertId();
            $hotel = array_merge($data, ['id' => $hotelId]);
            $hotel['image_url'] = getHotelImageUrl($hotel);
            
            Response::created($hotel, 'Hotel created successfully');
        } catch (PDOException $e) {
            error_log('Hotel creation error: ' . $e->getMessage());
            Response::error('Failed to create hotel');
        }
        break;
        
    default:
        Response::error('Method not allowed', 405);
}
?>