<?php
// Videos API Endpoint
global $db;

switch ($method) {
    case 'GET':
        try {
            $category = $_GET['category'] ?? '';
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
            
            $videos = getVideos();
            
            // Filter by category if specified
            if (!empty($category) && $category !== 'all') {
                $videos = array_filter($videos, function($video) use ($category) {
                    return $video['category'] === $category;
                });
                $videos = array_values($videos); // Re-index array
            }
            
            // Limit results
            if ($limit > 0) {
                $videos = array_slice($videos, 0, $limit);
            }
            
            
            Response::success($videos, 'Videos retrieved successfully');
        } catch (Exception $e) {
            error_log('Videos API Error: ' . $e->getMessage());
            Response::error('Failed to retrieve videos');
        }
        break;
        
    case 'POST':
        // Create new video (admin functionality)
        $input = json_decode(file_get_contents('php://input'), true);
        $validator = Validator::make($input, [
            'title' => 'required|min:2|max:200',
            'description' => 'required|min:10|max:500',
            'category' => 'required|in:rooms,dining,amenities,exterior,interior,business',
            'video_url' => 'required|url'
        ]);
        
        if ($validator->fails()) {
            Response::validation($validator->errors());
        }
        
        $data = $validator->validated();
        
        try {
            $stmt = $db->prepare("INSERT INTO videos (title, description, category, video_url, thumbnail_seed) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['title'],
                $data['description'],
                $data['category'],
                $data['video_url'],
                'video_' . time()
            ]);
            
            $videoId = $db->lastInsertId();
            $video = array_merge($data, ['id' => $videoId]);
            $video['thumbnail_url'] = getVideoThumbnailUrl($video);
            
            Response::created($video, 'Video created successfully');
        } catch (PDOException $e) {
            error_log('Video creation error: ' . $e->getMessage());
            Response::error('Failed to create video');
        }
        break;
        
    default:
        Response::error('Method not allowed', 405);
}
?>