<?php
// API Router - Main entry point for all API requests
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database and utilities
require_once __DIR__ . '/../includes/database.php';
require_once __DIR__ . '/utils/response.php';
require_once __DIR__ . '/utils/validation.php';

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api', '', $path);
$path = trim($path, '/');
$segments = explode('/', $path);

if (empty($segments[0])) {
    Response::error('No endpoint specified', 400);
}

// Route the request
try {
    switch ($segments[0]) {
        case 'cities':
            require_once __DIR__ . '/endpoints/cities.php';
            break;
            
        case 'hotels':
            require_once __DIR__ . '/endpoints/hotels.php';
            break;
            
        case 'gallery':
            require_once __DIR__ . '/endpoints/gallery.php';
            break;
            
        case 'videos':
            require_once __DIR__ . '/endpoints/videos.php';
            break;
            
        case 'contact':
            require_once __DIR__ . '/endpoints/contact.php';
            break;
            
        case 'faq':
            require_once __DIR__ . '/endpoints/faq.php';
            break;
            
        case 'pages':
            require_once __DIR__ . '/endpoints/pages.php';
            break;
            
        default:
            Response::error('Endpoint not found', 404);
    }
} catch (Exception $e) {
    error_log('API Error: ' . $e->getMessage());
    Response::error('Internal server error', 500);
}
?>