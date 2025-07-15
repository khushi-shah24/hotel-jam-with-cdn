# Elite Hotels - Single Page Application

A modern hotel booking website built as a Single Page Application (SPA) with APIs, AJAX, client-side rendering, and MySQL database.

## Architecture Overview

This project demonstrates the transformation from a monolithic PHP application to a modern SPA architecture with MySQL database:

### Build Time (Static Loading)
- **Header Navigation**: Loaded once and remains persistent
- **Sidebar Cities**: Loaded once via API and cached
- **Footer**: Static content loaded once

### Runtime (Dynamic Loading)
- **Page Content**: Dynamically fetched via AJAX calls
- **Hotel Data**: Real-time API requests with filtering and pagination
- **Gallery Images**: Lazy-loaded via API
- **Contact Forms**: Submitted via AJAX with validation

### Database
- **MySQL Database**: Replaced SQLite with MySQL for better performance and scalability
- **phpMyAdmin**: Database management through web interface
- **PDO**: Modern PHP database abstraction layer
- **Prepared Statements**: Secure database queries with parameter binding

## Key Features

### 🏗️ SPA Architecture
- **Client-side routing** with hash-based navigation
- **AJAX-powered** page transitions without full page reloads
- **API-first** approach with RESTful endpoints
- **Component-based** UI with reusable elements

### 🚀 Performance Optimizations
- **Caching system** for API responses (5-minute TTL)
- **Lazy loading** for images and content
- **Debounced search** for city filtering
- **Pagination** for large datasets
- **Database indexing** for optimized queries

### 📱 Modern UX/UI
- **Responsive design** for all device sizes
- **Loading indicators** for better user feedback
- **Toast notifications** for user actions
- **Smooth animations** and transitions
- **Modal dialogs** for enhanced interactions

### 🔧 Technical Stack

#### Frontend
- **Vanilla JavaScript** (ES6+) for SPA functionality
- **CSS3** with modern features (Grid, Flexbox, Animations)
- **HTML5** semantic structure
- **Fetch API** for HTTP requests

#### Backend APIs & Database
- **PHP 7.4+** with object-oriented design and PDO
- **MySQL 5.7+** database with 20,000+ hotels across 200 cities
- **phpMyAdmin** for database management
- **RESTful API** design with proper HTTP status codes
- **Input validation** and sanitization
- **Error handling** and logging
- **Database transactions** and foreign key constraints

#### API Endpoints
```
GET  /api/cities              - Get all cities with hotel counts
GET  /api/hotels              - Get hotels with filtering/pagination
GET  /api/hotels/featured     - Get featured hotels
GET  /api/hotels/count        - Get total hotel count
GET  /api/hotels/{id}         - Get specific hotel
GET  /api/gallery             - Get gallery images
GET  /api/videos              - Get video content
GET  /api/faq                 - Get FAQ data
POST /api/contact             - Submit contact form
```

## Database Setup

### Prerequisites
- **XAMPP/WAMP/MAMP** or similar local server environment
- **MySQL 5.7+** or **MariaDB 10.2+**
- **phpMyAdmin** (usually included with XAMPP/WAMP/MAMP)
- **PHP 7.4+** with PDO MySQL extension

### Installation Steps

1. **Start your local server environment** (XAMPP, WAMP, or MAMP)

2. **Open phpMyAdmin** in your browser (usually `http://localhost/phpmyadmin`)

3. **Create the database**:
   - Click "New" in the left sidebar
   - Enter database name: `elite_hotels`
   - Select collation: `utf8mb4_unicode_ci`
   - Click "Create"

4. **Import the database structure**:
   - Select the `elite_hotels` database
   - Click the "SQL" tab
   - Copy and paste the contents of `database_setup.sql`
   - Click "Go" to execute

5. **Configure database connection**:
   - Update the database credentials in `includes/database.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'elite_hotels');
   define('DB_USER', 'root');        // Your MySQL username
   define('DB_PASS', '');            // Your MySQL password
   ```

6. **Verify the setup**:
   - Open the application in your browser
   - Check that cities and hotels load properly
   - Verify that all functionality works as expected

### Database Structure

The MySQL database includes the following tables:

- **cities**: City information with hotel counts
- **hotels**: Hotel details with city relationships
- **gallery_images**: Image gallery data
- **videos**: Video content information

All tables include:
- **Primary keys** with AUTO_INCREMENT
- **Foreign key constraints** for data integrity
- **Indexes** for optimized query performance
- **Timestamps** for created_at and updated_at
- **UTF8MB4** encoding for full Unicode support

## Project Structure

```
/
├── index.html                 # Main SPA entry point
├── database_setup.sql         # MySQL database setup script
├── config/
│   └── database.php          # Database configuration
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   └── js/
│       ├── api.js            # API client and HTTP utilities
│       ├── spa.js            # SPA router and page management
│       ├── components.js     # Reusable UI components
│       └── script.js         # Legacy functionality and utilities
├── api/
│   ├── index.php            # API router
│   ├── endpoints/           # API endpoint handlers
│   │   ├── cities.php
│   │   ├── hotels.php
│   │   ├── gallery.php
│   │   ├── videos.php
│   │   ├── contact.php
│   │   └── faq.php
│   └── utils/               # API utilities
│       ├── response.php     # Response formatting
│       └── validation.php   # Input validation
├── includes/
│   └── database.php         # MySQL database connection and functions
└── .htaccess               # URL rewriting for SPA routing
```

## Key Changes from SQLite to MySQL

### Database Connection
- **Before**: SQLite3 class with file-based database
- **After**: PDO with MySQL connection string
- **Benefits**: Better performance, concurrent access, advanced features

### Query Syntax
- **Auto Increment**: `AUTOINCREMENT` → `AUTO_INCREMENT`
- **Data Types**: SQLite generic types → MySQL specific types
- **Binding**: `bindValue()` with type constants → `execute()` with array
- **Last Insert ID**: `lastInsertRowID()` → `lastInsertId()`

### Error Handling
- **Before**: SQLite3 exceptions
- **After**: PDOException with detailed error information
- **Benefits**: More descriptive error messages and better debugging

### Performance Improvements
- **Indexes**: Added proper database indexes for faster queries
- **Foreign Keys**: Enforced referential integrity
- **Connection Pooling**: Better resource management
- **Query Optimization**: MySQL query optimizer

## Key SPA Features

### 1. Client-Side Routing
- Hash-based navigation (`#home`, `#products/New York`)
- Browser history management with `pushState`
- Deep linking support for bookmarkable URLs

### 2. Dynamic Content Loading
```javascript
// Example: Loading hotels for a specific city
async function loadHotelsForCity(city) {
    const hotels = await API.hotels.getHotels({ city, limit: 24 });
    renderHotelsGrid(hotels);
}
```

### 3. State Management
- Centralized application state in SPA router
- Cached API responses for performance
- Active navigation and filter state persistence

### 4. Component System
```javascript
// Reusable UI components
const hotelCard = UIComponents.createCard(
    hotel.name,
    hotel.description,
    hotel.image_url,
    [{ text: 'Book Now', onclick: `bookHotel(${hotel.id})` }]
);
```

## API Design Patterns

### Response Format
```json
{
    "success": true,
    "message": "Hotels retrieved successfully",
    "data": [...],
    "pagination": {
        "current_page": 1,
        "total_pages": 10,
        "total_items": 240,
        "has_next": true,
        "has_prev": false
    },
    "timestamp": "2025-01-27T10:30:00Z"
}
```

### Error Handling
```json
{
    "success": false,
    "message": "Validation failed",
    "details": {
        "email": "The email field must be a valid email address"
    },
    "timestamp": "2025-01-27T10:30:00Z"
}
```

## Performance Features

### Caching Strategy
- **API Response Caching**: 5-minute TTL for GET requests
- **Image Lazy Loading**: Load images as they enter viewport
- **Component Memoization**: Reuse rendered components
- **Database Query Caching**: MySQL query cache for repeated queries

### Optimization Techniques
- **Debounced Search**: Prevent excessive API calls during typing
- **Pagination**: Load data in chunks for better performance
- **Minification**: Compressed CSS and optimized images
- **CDN-Ready**: Static assets can be served from CDN
- **Database Indexing**: Optimized database queries with proper indexes

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Features Used**: Fetch API, ES6 Classes, CSS Grid, Flexbox

## Development vs Production

### Development Features
- Detailed error logging
- Debug information in responses
- Unminified assets for debugging
- phpMyAdmin for database management

### Production Optimizations
- Error logging to files
- Minified and compressed assets
- Security headers via .htaccess
- Database query optimization
- MySQL performance tuning

## Getting Started

1. **Setup Database**: Create MySQL database using phpMyAdmin and import `database_setup.sql`
2. **Configure Web Server**: Apache/Nginx with PHP 7.4+
3. **Configure Database**: Update database credentials in `includes/database.php`
4. **Enable URL Rewriting**: Ensure .htaccess is processed
5. **Open Application**: Navigate to the domain root

The application will automatically load the SPA interface and begin making API calls to populate content dynamically.

## Key Differences: Monolithic vs SPA vs MySQL

| Aspect | Monolithic | SPA + SQLite | SPA + MySQL |
|--------|------------|--------------|-------------|
| **Page Loading** | Full page refresh | Dynamic content loading | Dynamic content loading |
| **Navigation** | Server-side routing | Client-side routing | Client-side routing |
| **Data Fetching** | PHP includes | AJAX API calls | AJAX API calls |
| **Database** | Direct queries | SQLite file | MySQL server |
| **Concurrency** | Limited | File locking issues | Full concurrent access |
| **Performance** | Server rendering | Client + file I/O | Client + optimized queries |
| **Scalability** | Monolithic scaling | Limited by file system | Horizontal scaling ready |
| **Management** | File system | File system | phpMyAdmin interface |
| **Backup** | File copy | File copy | Database dump/restore |
| **Integrity** | Application level | Limited constraints | Foreign key constraints |

This SPA architecture with MySQL provides a modern, responsive user experience with enterprise-grade database capabilities while maintaining all the functionality of the original application.