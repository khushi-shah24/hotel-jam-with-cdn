<?php
// Pages API Endpoint
global $db;

switch ($method) {
    case 'GET':
        if (!isset($segments[1])) {
            Response::error('Page not specified', 400);
        }
        
        $page = $segments[1];
        
        try {
            switch ($page) {
                case 'home':
                    $data = [
                        'title' => 'Welcome to Elite Hotels',
                        'subtitle' => 'Luxury Accommodations Worldwide',
                        'description' => 'Discover luxury accommodations in the world\'s most beautiful destinations. Experience unparalleled comfort, exceptional service, and unforgettable memories.',
                        'stats' => [
                            'hotels' => getTotalHotels(),
                            'cities' => count(getCities()),
                            'guests' => '1M+'
                        ]
                    ];
                    break;
                    
                case 'about':
                    $data = [
                        'title' => 'About Elite Hotels',
                        'content' => 'Elite Hotels has been providing luxury accommodations worldwide since 1985...',
                        'mission' => 'To provide exceptional hospitality experiences that exceed our guests\' expectations.',
                        'vision' => 'To be the world\'s most trusted luxury hotel brand.'
                    ];
                    break;
                    
                default:
                    Response::notFound('Page not found');
            }
            
            Response::success($data, "Page {$page} retrieved successfully");
            
        } catch (Exception $e) {
            error_log('Pages API Error: ' . $e->getMessage());
            Response::error('Failed to retrieve page content');
        }
        break;
        
    default:
        Response::error('Method not allowed', 405);
}
?>