<?php
define('PROJECT_ROOT', dirname(__DIR__));

// Database configuration - Update these with your production MySQL credentials
$db_config = [
    'host' => $_ENV['DB_HOST'] ?? 'localhost',
    'name' => $_ENV['DB_NAME'] ?? 'elite_hotels', 
    'user' => $_ENV['DB_USER'] ?? 'root',
    'pass' => $_ENV['DB_PASS'] ?? '',
    'charset' => 'utf8mb4'
];

// Fallback to constants if environment variables not available
define('DB_HOST', $db_config['host']);
define('DB_NAME', $db_config['name']);
define('DB_USER', $db_config['user']);
define('DB_PASS', $db_config['pass']);
define('DB_CHARSET', $db_config['charset']);

// Image configuration for local and Cloudinary images
$CITY_FOLDER_MAP = [
    'Abidjan' => 'City1',
    'Abu Dhabi' => 'City2',
    'Accra' => 'City3',
    'Addis Ababa' => 'City4',
    'Adelaide' => 'City5',
    'Algiers' => 'City6',
    'Amman' => 'City7',
    'Amsterdam' => 'City8',
    'Ankara' => 'City9',
    'Antwerp' => 'City10',
    'Arequipa' => 'City11',
    'Athens' => 'City12',
    'Atlanta' => 'City13',
    'Auckland' => 'City14',
    'Austin' => 'City15',
    'Baghdad' => 'City16',
    'Baltimore' => 'City17',
    'Bamako' => 'City18',
    'Bangalore' => 'City19',
    'Bangkok' => 'City20',
    'Bangui' => 'City21',
    'Barcelona' => 'City22',
    'Barranquilla' => 'City23',
    'Basel' => 'City24',
    'Beijing' => 'City25',
    'Beirut' => 'City26',
    'Berlin' => 'City27',
    'Bern' => 'City28',
    'Bogotá' => 'City29',
    'Bordeaux' => 'City30',
    'Boston' => 'City31',
    'Brazzaville' => 'City32',
    'Brisbane' => 'City33',
    'Brussels' => 'City34',
    'Bucharest' => 'City35',
    'Budapest' => 'City36',
    'Buenos Aires' => 'City37',
    'Busan' => 'City38',
    'Cairo' => 'City39',
    'Calgary' => 'City40',
    'Cali' => 'City41',
    'Cancun' => 'City42',
    'Cape Town' => 'City43',
    'Caracas' => 'City44',
    'Cartagena' => 'City45',
    'Casablanca' => 'City46',
    'Chennai' => 'City47',
    'Chicago' => 'City48',
    'Chiclayo' => 'City49',
    'Chisinau' => 'City50',
    'Christchurch' => 'City51',
    'Cleveland' => 'City52',
    'Cologne' => 'City53',
    'Colombo' => 'City54',
    'Copenhagen' => 'City55',
    'Cuenca' => 'City56',
    'Cusco' => 'City57',
    'Daegu' => 'City58',
    'Dakar' => 'City59',
    'Dallas' => 'City60',
    'Damascus' => 'City61',
    'Delhi' => 'City62',
    'Denver' => 'City63',
    'Detroit' => 'City64',
    'Dhaka' => 'City65',
    'Doha' => 'City66',
    'Dubai' => 'City67',
    'Dublin' => 'City68',
    'Edinburgh' => 'City69',
    'Erbil' => 'City70',
    'Florence' => 'City71',
    'Frankfurt' => 'City72',
    'Fukuoka' => 'City73',
    'Geneva' => 'City74',
    'Ghent' => 'City75',
    'Graz' => 'City76',
    'Guadalajara' => 'City77',
    'Guangzhou' => 'City78',
    'Guayaquil' => 'City79',
    'Gwangju' => 'City80',
    'Haifa' => 'City81',
    'Hamburg' => 'City82',
    'Hanoi' => 'City83',
    'Helsinki' => 'City84',
    'Hiroshima' => 'City85',
    'Ho Chi Minh City' => 'City86',
    'Hong Kong' => 'City87',
    'Houston' => 'City88',
    'Incheon' => 'City89',
    'Innsbruck' => 'City90',
    'Istanbul' => 'City91',
    'Jakarta' => 'City92',
    'Jeddah' => 'City93',
    'Jerusalem' => 'City94',
    'Johannesburg' => 'City95',
    'Kabul' => 'City96',
    'Kiev' => 'City97',
    'Kinshasa' => 'City98',
    'Kolkata' => 'City99',
    'Kuala Lumpur' => 'City100',
    'Kuwait City' => 'City101',
    'Kyoto' => 'City102',
    'La Paz' => 'City103',
    'Lagos' => 'City104',
    'Las Vegas' => 'City105',
    'Lima' => 'City106',
    'Lisbon' => 'City107',
    'London' => 'City108',
    'Los Angeles' => 'City109',
    'Luxembourg City' => 'City110',
    'Lyon' => 'City111',
    'Madrid' => 'City112',
    'Manama' => 'City113',
    'Manchester' => 'City114',
    'Manila' => 'City115',
    'Marrakech' => 'City116',
    'Marseille' => 'City117',
    'Medellín' => 'City118',
    'Melbourne' => 'City119',
    'Memphis' => 'City120',
    'Mexico City' => 'City121',
    'Miami' => 'City122',
    'Milan' => 'City123',
    'Milwaukee' => 'City124',
    'Minneapolis' => 'City125',
    'Minsk' => 'City126',
    'Monterrey' => 'City127',
    'Montevideo' => 'City128',
    'Montreal' => 'City129',
    'Mumbai' => 'City130',
    'Munich' => 'City131',
    'Muscat' => 'City132',
    'N\'Djamena' => 'City133',
    'Nairobi' => 'City134',
    'Naples' => 'City135',
    'Nashville' => 'City136',
    'New Orleans' => 'City137',
    'New York' => 'City138',
    'Niamey' => 'City139',
    'Nice' => 'City140',
    'Nuku\'alofa' => 'City141',
    'Osaka' => 'City142',
    'Oslo' => 'City143',
    'Ottawa' => 'City144',
    'Ouagadougou' => 'City145',
    'Paris' => 'City146',
    'Perth' => 'City147',
    'Philadelphia' => 'City148',
    'Phnom Penh' => 'City149',
    'Phoenix' => 'City150',
    'Pittsburgh' => 'City151',
    'Port Moresby' => 'City152',
    'Portland' => 'City153',
    'Prague' => 'City154',
    'Quito' => 'City155',
    'Reykjavik' => 'City156',
    'Riga' => 'City157',
    'Rio de Janeiro' => 'City158',
    'Riyadh' => 'City159',
    'Rome' => 'City160',
    'Rotterdam' => 'City161',
    'Salzburg' => 'City162',
    'San Antonio' => 'City163',
    'San Francisco' => 'City164',
    'Santiago' => 'City165',
    'São Paulo' => 'City166',
    'Sapporo' => 'City167',
    'Seattle' => 'City168',
    'Seoul' => 'City169',
    'Shanghai' => 'City170',
    'Shenzhen' => 'City171',
    'Singapore' => 'City172',
    'Skopje' => 'City173',
    'Sofia' => 'City174',
    'Stockholm' => 'City175',
    'Stuttgart' => 'City176',
    'Suva' => 'City177',
    'Sydney' => 'City178',
    'Taipei' => 'City179',
    'Tallinn' => 'City180',
    'Tashkent' => 'City181',
    'Tehran' => 'City182',
    'Tel Aviv' => 'City183',
    'The Hague' => 'City184',
    'Tijuana' => 'City185',
    'Tokyo' => 'City186',
    'Toronto' => 'City187',
    'Toulouse' => 'City188',
    'Trujillo' => 'City189',
    'Tunis' => 'City190',
    'Ulsan' => 'City191',
    'Vancouver' => 'City192',
    'Venice' => 'City193',
    'Vienna' => 'City194',
    'Vilnius' => 'City195',
    'Warsaw' => 'City196',
    'Washington DC' => 'City197',
    'Wellington' => 'City198',
    'Yangon' => 'City199',
    'Zurich' => 'City200',
];

// Cloudinary configuration
define('CLOUDINARY_CLOUD_NAME', 'de7folpai');
define('CLOUDINARY_API_KEY', '449151716324455');
define('CLOUDINARY_API_SECRET', 'VpjuPlJEl32TFhIKTy7xt42C0SQ');

// Base paths for local images
define('LOCAL_IMAGES_PATH', 'assets/images/');
define('LOCAL_HOTELS_PATH', LOCAL_IMAGES_PATH . 'hotels/');

// Cities that will use local images (first 2 cities)
$LOCAL_IMAGE_CITIES = ['City1', 'City2'];

// Cities that will use Cloudinary images (City3 to City200)
$CLOUDINARY_IMAGE_CITIES = [
    'City3', 'City4', 'City5', 'City6', 'City7', 'City8', 'City9', 'City10',
    'City11', 'City12', 'City13', 'City14', 'City15', 'City16', 'City17', 'City18',
    'City19', 'City20', 'City21', 'City22', 'City23', 'City24', 'City25', 'City26',
    'City27', 'City28', 'City29', 'City30', 'City31', 'City32', 'City33', 'City34',
    'City35', 'City36', 'City37', 'City38', 'City39', 'City40', 'City41', 'City42',
    'City43', 'City44', 'City45', 'City46', 'City47', 'City48', 'City49', 'City50',
    'City51', 'City52', 'City53', 'City54', 'City55', 'City56', 'City57', 'City58',
    'City59', 'City60', 'City61', 'City62', 'City63', 'City64', 'City65', 'City66',
    'City67', 'City68', 'City69', 'City70', 'City71', 'City72', 'City73', 'City74',
    'City75', 'City76', 'City77', 'City78', 'City79', 'City80', 'City81', 'City82',
    'City83', 'City84', 'City85', 'City86', 'City87', 'City88', 'City89', 'City90',
    'City91', 'City92', 'City93', 'City94', 'City95', 'City96', 'City97', 'City98',
    'City99', 'City100', 'City101', 'City102', 'City103', 'City104', 'City105', 'City106',
    'City107', 'City108', 'City109', 'City110', 'City111', 'City112', 'City113', 'City114',
    'City115', 'City116', 'City117', 'City118', 'City119', 'City120', 'City121', 'City122',
    'City123', 'City124', 'City125', 'City126', 'City127', 'City128', 'City129', 'City130',
    'City131', 'City132', 'City133', 'City134', 'City135', 'City136', 'City137', 'City138',
    'City139', 'City140', 'City141', 'City142', 'City143', 'City144', 'City145', 'City146',
    'City147', 'City148', 'City149', 'City150', 'City151', 'City152', 'City153', 'City154',
    'City155', 'City156', 'City157', 'City158', 'City159', 'City160', 'City161', 'City162',
    'City163', 'City164', 'City165', 'City166', 'City167', 'City168', 'City169', 'City170',
    'City171', 'City172', 'City173', 'City174', 'City175', 'City176', 'City177', 'City178',
    'City179', 'City180', 'City181', 'City182', 'City183', 'City184', 'City185', 'City186',
    'City187', 'City188', 'City189', 'City190', 'City191', 'City192', 'City193', 'City194',
    'City195', 'City196', 'City197', 'City198', 'City199', 'City200'
];

// Image file extensions to look for
$SUPPORTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

// Connect to MySQL database with error handling
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];
    $db = new PDO($dsn, DB_USER, DB_PASS, $options);
    
    // Test the connection
    $db->query("SELECT 1");
    
} catch (PDOException $e) {
    // Log error for debugging but don't expose sensitive info in production
    error_log("Database connection failed: " . $e->getMessage());
    
    // Return JSON error for API calls
    if (strpos($_SERVER['REQUEST_URI'], '/api/') !== false) {
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed',
            'timestamp' => date('c')
        ]);
        exit;
    }
    
    die("Database connection failed. Please check your configuration.");
}

// Create tables if they don't exist (MySQL syntax)
$db->exec("
    CREATE TABLE IF NOT EXISTS cities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        country VARCHAR(255) NOT NULL,
        description TEXT,
        image_seed VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

$db->exec("
    CREATE TABLE IF NOT EXISTS hotels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        city_id INT NOT NULL,
        city_name VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        amenities TEXT,
        featured TINYINT(1) DEFAULT 0,
        image_seed VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE,
        INDEX idx_city_id (city_id),
        INDEX idx_city_name (city_name),
        INDEX idx_featured (featured),
        INDEX idx_rating (rating),
        INDEX idx_price (price)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

$db->exec("
    CREATE TABLE IF NOT EXISTS gallery_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_seed VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

$db->exec("
    CREATE TABLE IF NOT EXISTS videos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        video_url VARCHAR(500) NOT NULL,
        thumbnail_seed VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

// Fetch all cities with hotel count using subquery
function getCities() {
    global $db;
    try {
        $stmt = $db->query("SELECT c.*, (SELECT COUNT(*) FROM hotels h WHERE h.city_name = c.name) as hotel_count FROM cities c ORDER BY c.name");
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching cities: " . $e->getMessage());
        return [];
    }
}

// Fetch featured hotels (limit configurable) - FIXED to avoid repetition
function getFeaturedHotels($limit = 5) {
    global $db;
    try {
        // Get featured hotels from different cities to avoid repetition
        $stmt = $db->prepare("SELECT * FROM hotels WHERE featured = 1 ORDER BY city_name, rating DESC LIMIT ?");
        $stmt->execute([$limit]);
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching featured hotels: " . $e->getMessage());
        return [];
    }
}

// FIXED: Fetch hotels with proper pagination and city-specific limits
function getHotels($city = '', $limit = 24, $offset = 0) {
    global $db, $CITY_FOLDER_MAP, $CLOUDINARY_IMAGE_CITIES;
    
    try {
        $hotels = [];
        
        if (!empty($city)) {
            // Get mapped folder for the city
            $mapped_folder = $CITY_FOLDER_MAP[$city] ?? '';
            
            // For City5-City200, limit to 5 hotels only
            if (in_array($mapped_folder, $CLOUDINARY_IMAGE_CITIES)) {
                $city_number = (int)str_replace('City', '', $mapped_folder);
                if ($city_number >= 5) {
                    $limit = 5; // Only 5 hotels for City5-City200
                    $offset = 0; // Start from beginning
                }
            }
            
            // Get hotels for specific city
            $stmt = $db->prepare("SELECT h.* FROM hotels h 
                JOIN cities c ON h.city_id = c.id
                WHERE c.name = ?
                ORDER BY h.featured DESC, h.rating DESC, h.price ASC 
                LIMIT ? OFFSET ?");
            $stmt->execute([$city, $limit, $offset]);
        } else {
            // Get all hotels with proper distribution
            $stmt = $db->prepare("SELECT * FROM hotels ORDER BY featured DESC, rating DESC, price ASC LIMIT ? OFFSET ?");
            $stmt->execute([$limit, $offset]);
        }
        
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching hotels: " . $e->getMessage());
        return [];
    }
}

function getCityIdByName($cityName) {
    global $db;
    try {
        $stmt = $db->prepare("SELECT id FROM cities WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))");
        $stmt->execute([$cityName]);
        $result = $stmt->fetch();
        return $result ? $result['id'] : null;
    } catch (PDOException $e) {
        error_log("Error getting city ID: " . $e->getMessage());
        return null;
    }
}

// FIXED: Get total hotel count for pagination with city-specific limits
function getTotalHotels($city = '') {
    global $db, $CITY_FOLDER_MAP, $CLOUDINARY_IMAGE_CITIES;
    
    try {
        if (!empty($city)) {
            // Get mapped folder for the city
            $mapped_folder = $CITY_FOLDER_MAP[$city] ?? '';
            
            // For City5-City200, return only 5
            if (in_array($mapped_folder, $CLOUDINARY_IMAGE_CITIES)) {
                $city_number = (int)str_replace('City', '', $mapped_folder);
                if ($city_number >= 5) {
                    return 5; // Only 5 hotels for City5-City200
                }
            }
            
            // For other cities, get actual count
            $stmt = $db->prepare("SELECT id FROM cities WHERE name = ?");
            $stmt->execute([$city]);
            $cityData = $stmt->fetch();

            if ($cityData) {
                $city_id = $cityData['id'];
                $stmt = $db->prepare("SELECT COUNT(*) as count FROM hotels WHERE city_id = ?");
                $stmt->execute([$city_id]);
                $result = $stmt->fetch();
                return $result['count'];
            } else {
                return 0;
            }
        } else {
            $stmt = $db->query("SELECT COUNT(*) as count FROM hotels");
            $result = $stmt->fetch();
            return $result['count'];
        }
    } catch (PDOException $e) {
        error_log("Error getting total hotels: " . $e->getMessage());
        return 0;
    }
}

// Fetch a single hotel by ID
function getHotelById($id) {
    global $db;
    try {
        $stmt = $db->prepare("SELECT * FROM hotels WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    } catch (PDOException $e) {
        error_log("Error fetching hotel by ID: " . $e->getMessage());
        return false;
    }
}

// Fetch gallery images
function getGalleryImages() {
    global $db;
    try {
        $stmt = $db->query("SELECT * FROM gallery_images ORDER BY category, title");
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error fetching gallery images: " . $e->getMessage());
        return [];
    }
}

// Fetch videos
function getVideos() {
    $videos = [];
    $titles = [
        "Luxury Hotel Tour",
        "Spacious Room Walkthrough",
        "Infinity Pool Showcase",
        "Fine Dining Experience",
        "Elegant Lobby Overview",
        "Wellness Spa Highlights",
        "Skyline View Rooms",
        "Business Lounge Features",
        "Private Suite Tour",
        "Family Friendly Stays"
    ];

    $descriptions = [
        "Explore the grandeur and comfort of our top-tier hotels.",
        "Take a tour inside our elegant and spacious rooms.",
        "Relax by the pool and take in breathtaking views.",
        "Experience five-star dining from our expert chefs.",
        "Walk through the majestic lobbies of our luxury hotels.",
        "Unwind with spa and wellness amenities.",
        "Stay in rooms that open up to city skylines.",
        "Perfect for business travelers seeking productivity.",
        "A private retreat for ultimate relaxation.",
        "Comfort and fun for the whole family."
    ];

    for ($i = 1; $i <= 10; $i++) {
        $public_id = "video_{$i}";
        $videos[] = [
            'video_url' => buildCloudinaryVideoUrl($public_id),
            'thumbnail_url' => buildCloudinaryThumbnailUrl($public_id),
            'title' => $titles[$i - 1],
            'description' => $descriptions[$i - 1],
            'category' => 'Hotel Tour'
        ];
    }

    return $videos;
}

/**
 * FIXED: Get local hotel image for City1 and City2
 */
function getLocalHotelImage($hotel, $city, $width = 400, $height = 300, $n = 1) {
    global $SUPPORTED_EXTENSIONS, $CITY_FOLDER_MAP;

    $hotel_id = $hotel['id'] ?? 1;
    $folder = $CITY_FOLDER_MAP[$city] ?? $city;
    $prefix = $folder;
    
    // Debug: Log the path being checked
    error_log("Looking for local image: City={$city}, Folder={$folder}, N={$n}");
    
    // Try matching file: City1_1.jpg, etc.
    foreach ($SUPPORTED_EXTENSIONS as $ext) {
        $image_name = $prefix . '_' . $n . '.' . $ext;
        $image_path = LOCAL_HOTELS_PATH . $folder . '/' . $image_name;
        $full_path = PROJECT_ROOT . '/' . $image_path;

        error_log("Checking file: {$full_path}");
        
        if (file_exists($full_path)) {
            error_log("Found local image: {$image_path}");
            return $image_path . '?w=' . $width . '&h=' . $height;
        }
    }

    // Fallback: cycle through available images in the mapped folder
    $directory = PROJECT_ROOT . '/' . LOCAL_HOTELS_PATH . $folder . '/';
    $available_images = getAvailableImages($directory);
    
    error_log("Available images in {$directory}: " . print_r($available_images, true));
    
    if (!empty($available_images)) {
        $image_index = ($hotel_id - 1) % count($available_images);
        $selected_image = $available_images[$image_index];
        $image_path = LOCAL_HOTELS_PATH . $folder . '/' . $selected_image;
        error_log("Using fallback image: {$image_path}");
        return $image_path . '?w=' . $width . '&h=' . $height;
    }

    error_log("No local images found, using default");
    return getDefaultImage($width, $height);
}

/**
 * Get Cloudinary hotel image for City3 to City200
 */
function getCloudinaryHotelImage($hotel, $city, $width = 400, $height = 300, $n = 1) {
    global $CITY_FOLDER_MAP;

    $mapped_folder = $CITY_FOLDER_MAP[$city];

    if (in_array($mapped_folder, ['City3', 'City4'])) {
        // City3 and City4 have 100 unique images
        $image_index = $n;  // Use $n directly
    } else {
        // Other cities only have 5 images
        $image_index = (($n - 1) % 5) + 1;
    }

    $public_id = "{$mapped_folder}_{$image_index}";
    return buildCloudinaryUrl($public_id, $width, $height);
}

/**
 * Build Cloudinary URL
 */
function buildCloudinaryUrl($public_id, $width = 400, $height = 300, $crop = 'fill') {
    $cloud_name = "de7folpai";
    $transformation = "w_{$width},h_{$height},c_{$crop},q_auto,f_auto";

    return "https://res.cloudinary.com/{$cloud_name}/image/upload/v1752173159/{$public_id}";
}

/**
 * Get available images in a directory
 */
function getAvailableImages($directory) {
    global $SUPPORTED_EXTENSIONS;

    if (!is_dir($directory)) {
        error_log("Directory does not exist: {$directory}");
        return [];
    }

    $images = [];
    $files = scandir($directory);

    foreach ($files as $file) {
        if ($file === '.' || $file === '..')
            continue;

        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($extension, $SUPPORTED_EXTENSIONS)) {
            $images[] = $file;
        }
    }

    sort($images); // Ensure consistent ordering
    return $images;
}

/**
 * Get default placeholder image
 */
function getDefaultImage($width = 400, $height = 300) {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='{$width}' height='{$height}' viewBox='0 0 {$width} {$height}'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial, sans-serif' font-size='14'%3EHotel Image%3C/text%3E%3C/svg%3E";
}

/**
 * FIXED: Get hotel image URL - Main function that determines local vs Cloudinary
 */
function getHotelImageUrl($hotel, $n = 1) {
    global $LOCAL_IMAGE_CITIES, $CLOUDINARY_IMAGE_CITIES, $CITY_FOLDER_MAP;
    
    $width = 400;
    $height = 300;
    $city = $hotel['city_name'];
    $mapped_folder = $CITY_FOLDER_MAP[$city] ?? '';
    
    // Calculate proper image index to avoid repetition
    $hotel_id = $hotel['id'] ?? 1;
    $image_index = $n ?: (($hotel_id - 1) % 100) + 1;
    
    if (in_array($mapped_folder, $LOCAL_IMAGE_CITIES)) {
        return getLocalHotelImage($hotel, $city, $width, $height, $image_index);
    } elseif (in_array($mapped_folder, $CLOUDINARY_IMAGE_CITIES)) {
        return getCloudinaryHotelImage($hotel, $city, $width, $height, $image_index);
    } else {
        return getDefaultImage($width, $height);
    }
}

/**
 * Get gallery image URL - uses Cloudinary for gallery images
 */
function getGalleryImageUrl($image) {
    // For gallery images, generate random Cloudinary images from City3-City200
    $cityNum = rand(3, 200);
    $maxImages = ($cityNum === 3 || $cityNum === 4) ? 100 : 5;
    $imgNum = rand(1, $maxImages);
    
    $folder = "City{$cityNum}";
    $public_id = "{$folder}_{$imgNum}";
    
    return buildCloudinaryUrl($public_id, 400, 300);
}

/**
 * Get video thumbnail URL - uses Cloudinary
 */
function buildCloudinaryVideoUrl($public_id) {
    $cloud_name = "de7folpai";
    return "https://res.cloudinary.com/{$cloud_name}/video/upload/{$public_id}.mp4";
}

function buildCloudinaryThumbnailUrl($public_id, $width = 400, $height = 300) {
    $cloud_name = "de7folpai";
    return "https://res.cloudinary.com/{$cloud_name}/video/upload/w_{$width},h_{$height},c_fill,q_auto,f_auto/{$public_id}.jpg";
}

/**
 * Legacy function - kept for backward compatibility but now uses new system
 */
function getImageUrl($seed, $width = 400, $height = 300) {
    // This function is kept for backward compatibility
    // but now we use the new image system
    return getDefaultImage($width, $height);
}

/**
 * Create directory structure for local images
 */
function createImageDirectories() {
    $directories = [
        PROJECT_ROOT . '/' . LOCAL_IMAGES_PATH,
        PROJECT_ROOT . '/' . LOCAL_HOTELS_PATH,
        PROJECT_ROOT . '/' . LOCAL_HOTELS_PATH . 'City1/',
        PROJECT_ROOT . '/' . LOCAL_HOTELS_PATH . 'City2/',
    ];

    foreach ($directories as $dir) {
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
            error_log("Created directory: {$dir}");
        }
    }
}

// Create image directories on initialization
createImageDirectories();
?>