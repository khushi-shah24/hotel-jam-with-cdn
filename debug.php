<?php
// Debug script to test database connection and API endpoints
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Database Connection Debug</h1>";

// Test database connection
try {
    require_once 'includes/database.php';
    echo "<p style='color: green;'>✅ Database connection successful!</p>";
    
    // Test basic query
    $stmt = $db->query("SELECT COUNT(*) as count FROM cities");
    $result = $stmt->fetch();
    echo "<p>Cities in database: " . $result['count'] . "</p>";
    
    $stmt = $db->query("SELECT COUNT(*) as count FROM hotels");
    $result = $stmt->fetch();
    echo "<p>Hotels in database: " . $result['count'] . "</p>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Database connection failed: " . $e->getMessage() . "</p>";
}

// Test API endpoints
echo "<h2>API Endpoint Tests</h2>";

$endpoints = [
    '/api/cities',
    '/api/hotels',
    '/api/hotels/featured',
    '/api/faq',
    '/api/gallery',
    '/api/videos'
];

foreach ($endpoints as $endpoint) {
    $url = 'http://' . $_SERVER['HTTP_HOST'] . $endpoint;
    echo "<h3>Testing: {$endpoint}</h3>";
    
    $context = stream_context_create([
        'http' => [
            'timeout' => 10,
            'ignore_errors' => true
        ]
    ]);
    
    $response = @file_get_contents($url, false, $context);
    
    if ($response === false) {
        echo "<p style='color: red;'>❌ Failed to fetch {$endpoint}</p>";
    } else {
        $data = json_decode($response, true);
        if ($data && isset($data['success']) && $data['success']) {
            echo "<p style='color: green;'>✅ {$endpoint} working</p>";
        } else {
            echo "<p style='color: orange;'>⚠️ {$endpoint} returned: " . substr($response, 0, 200) . "...</p>";
        }
    }
}

// Test file permissions
echo "<h2>File Permissions</h2>";
$files_to_check = [
    'includes/database.php',
    'api/index.php',
    'api/endpoints/cities.php',
    'api/endpoints/hotels.php'
];

foreach ($files_to_check as $file) {
    if (file_exists($file)) {
        $perms = fileperms($file);
        echo "<p>✅ {$file}: " . substr(sprintf('%o', $perms), -4) . "</p>";
    } else {
        echo "<p style='color: red;'>❌ {$file}: File not found</p>";
    }
}

// PHP Configuration
echo "<h2>PHP Configuration</h2>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>PDO MySQL: " . (extension_loaded('pdo_mysql') ? '✅ Available' : '❌ Not available') . "</p>";
echo "<p>Error Reporting: " . error_reporting() . "</p>";
echo "<p>Display Errors: " . ini_get('display_errors') . "</p>";
?>