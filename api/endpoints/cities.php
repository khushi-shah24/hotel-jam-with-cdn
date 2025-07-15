<?php
// Cities API Endpoint
global $db;

// Verify database connection
if (!$db) {
    Response::error('Database connection not available', 500);
}

switch ($method) {
    case 'GET':
        try {
            $cities = getCities();
            
            if ($cities === false || $cities === null) {
                Response::error('Failed to retrieve cities from database', 500);
            }
            
            // Add image URLs to cities
            foreach ($cities as &$city) {
                $city['image_url'] = getImageUrl($city['image_seed'] ?? 'city' . $city['id'], 400, 300);
            }
            
            Response::success($cities, 'Cities retrieved successfully');
        } catch (Exception $e) {
            error_log('Cities API Error: ' . $e->getMessage());
            Response::error('Failed to retrieve cities: ' . $e->getMessage());
        }
        break;
        
    case 'POST':
        // Create new city (admin functionality)
        $input = json_decode(file_get_contents('php://input'), true);
        $validator = Validator::make($input, [
            'name' => 'required|min:2|max:100',
            'country' => 'required|min:2|max:100',
            'description' => 'required|min:10|max:500'
        ]);
        
        if ($validator->fails()) {
            Response::validation($validator->errors());
        }
        
        $data = $validator->validated();
        
        try {
            $stmt = $db->prepare("INSERT INTO cities (name, country, description, image_seed) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data['name'],
                $data['country'],
                $data['description'],
                'city_' . time()
            ]);
            
            $cityId = $db->lastInsertId();
            $city = [
                'id' => $cityId,
                'name' => $data['name'],
                'country' => $data['country'],
                'description' => $data['description'],
                'hotel_count' => 0
            ];
            
            Response::created($city, 'City created successfully');
        } catch (PDOException $e) {
            error_log('City creation error: ' . $e->getMessage());
            Response::error('Failed to create city');
        }
        break;
        
    default:
        Response::error('Method not allowed', 405);
}
?>