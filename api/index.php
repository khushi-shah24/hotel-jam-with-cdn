<?php
// API Router - Main entry point for all API requests

// Enable error reporting for debugging (disable in production)
if ($_ENV['APP_ENV'] !== 'production') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database and utilities with error handling
try {
    require_once __DIR__ . '/../includes/database.php';
    require_once __DIR__ . '/utils/response.php';
    require_once __DIR__ . '/utils/validation.php';
} catch (Exception $e) {
    error_log('Failed to include required files: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server configuration error',
        'timestamp' => date('c')
    ]);
    exit;
}

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api', '', $path);
$path = trim($path, '/');
$segments = explode('/', $path);

if (empty($segments[0])) {
    Response::error('No endpoint specified', 400);
}

// Verify database connection before routing
if (!isset($db) || !$db) {
    Response::error('Database not available', 500);
}

// Route the request
try {
    switch ($segments[0]) {
        case 'cities':
            if (file_exists(__DIR__ . '/endpoints/cities.php')) {
                require_once __DIR__ . '/endpoints/cities.php';
            } else {
                Response::error('Cities endpoint not found', 404);
            }
            break;
            
        case 'hotels':
            if (file_exists(__DIR__ . '/endpoints/hotels.php')) {
                require_once __DIR__ . '/endpoints/hotels.php';
            } else {
                Response::error('Hotels endpoint not found', 404);
            }
            break;
            
        case 'gallery':
            if (file_exists(__DIR__ . '/endpoints/gallery.php')) {
                require_once __DIR__ . '/endpoints/gallery.php';
            } else {
                Response::error('Gallery endpoint not found', 404);
            }
            break;
            
        case 'videos':
            if (file_exists(__DIR__ . '/endpoints/videos.php')) {
                require_once __DIR__ . '/endpoints/videos.php';
            } else {
                Response::error('Videos endpoint not found', 404);
            }
            break;
            
        case 'contact':
            if (file_exists(__DIR__ . '/endpoints/contact.php')) {
                require_once __DIR__ . '/endpoints/contact.php';
            } else {
                Response::error('Contact endpoint not found', 404);
            }
            break;
            
        case 'faq':
            if (file_exists(__DIR__ . '/endpoints/faq.php')) {
                require_once __DIR__ . '/endpoints/faq.php';
            } else {
                Response::error('FAQ endpoint not found', 404);
            }
            break;
            
        case 'pages':
            if (file_exists(__DIR__ . '/endpoints/pages.php')) {
                require_once __DIR__ . '/endpoints/pages.php';
            } else {
                Response::error('Pages endpoint not found', 404);
            }
            break;
            
        default:
            Response::error('Endpoint not found', 404);
    }
} catch (Exception $e) {
    error_log('API Error: ' . $e->getMessage());
    Response::error('Internal server error: ' . $e->getMessage(), 500);
}
?>