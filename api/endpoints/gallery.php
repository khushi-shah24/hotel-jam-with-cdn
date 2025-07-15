<?php
// Gallery API Endpoint
global $db;

switch ($method) {
    case 'GET':
        try {
            $category = $_GET['category'] ?? '';
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
            
            $images = getGalleryImages();
            
            // Filter by category if specified
            if (!empty($category) && $category !== 'all') {
                $images = array_filter($images, function($image) use ($category) {
                    return $image['category'] === $category;
                });
                $images = array_values($images); // Re-index array
            }
            
            // Limit results
            if ($limit > 0) {
                $images = array_slice($images, 0, $limit);
            }
            
            // Add image URLs
            foreach ($images as &$image) {
                $image['image_url'] = getGalleryImageUrl($image);
            }
            
            Response::success($images, 'Gallery images retrieved successfully');
        } catch (Exception $e) {
            error_log('Gallery API Error: ' . $e->getMessage());
            Response::error('Failed to retrieve gallery images');
        }
        break;
        
    case 'POST':
        // Create new gallery image (admin functionality)
        $input = json_decode(file_get_contents('php://input'), true);
        $validator = Validator::make($input, [
            'title' => 'required|min:2|max:200',
            'category' => 'required|in:exterior,interior,rooms,amenities,dining,business',
            'description' => 'required|min:10|max:500'
        ]);
        
        if ($validator->fails()) {
            Response::validation($validator->errors());
        }
        
        $data = $validator->validated();
        
        try {
            $stmt = $db->prepare("INSERT INTO gallery_images (title, category, image_seed, description) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data['title'],
                $data['category'],
                'gallery_' . time(),
                $data['description']
            ]);
            
            $imageId = $db->lastInsertId();
            $image = array_merge($data, ['id' => $imageId]);
            $image['image_url'] = getGalleryImageUrl($image);
            
            Response::created($image, 'Gallery image created successfully');
        } catch (PDOException $e) {
            error_log('Gallery image creation error: ' . $e->getMessage());
            Response::error('Failed to create gallery image');
        }
        break;
        
    default:
        Response::error('Method not allowed', 405);
}
?>