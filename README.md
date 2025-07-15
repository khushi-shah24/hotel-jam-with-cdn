# Elite Hotels - Single Page Application

A modern hotel booking website built as a Single Page Application (SPA) with APIs, AJAX, and client-side rendering.

## Architecture Overview

This project demonstrates the transformation from a monolithic PHP application to a modern SPA architecture:

### Build Time (Static Loading)
- **Header Navigation**: Loaded once and remains persistent
- **Sidebar Cities**: Loaded once via API and cached
- **Footer**: Static content loaded once

### Runtime (Dynamic Loading)
- **Page Content**: Dynamically fetched via AJAX calls
- **Hotel Data**: Real-time API requests with filtering and pagination
- **Gallery Images**: Lazy-loaded via API
- **Contact Forms**: Submitted via AJAX with validation

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

#### Backend APIs
- **PHP 7.4+** with object-oriented design
- **SQLite** database with 20,000+ hotels across 200 cities
- **RESTful API** design with proper HTTP status codes
- **Input validation** and sanitization
- **Error handling** and logging

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

## Project Structure

```
/
├── index.html                 # Main SPA entry point
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
│   └── database.php         # Database connection and functions
├── data/
│   └── hotels.db           # SQLite database
└── .htaccess               # URL rewriting for SPA routing
```

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

### Optimization Techniques
- **Debounced Search**: Prevent excessive API calls during typing
- **Pagination**: Load data in chunks for better performance
- **Minification**: Compressed CSS and optimized images
- **CDN-Ready**: Static assets can be served from CDN

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Features Used**: Fetch API, ES6 Classes, CSS Grid, Flexbox

## Development vs Production

### Development Features
- Detailed error logging
- Debug information in responses
- Unminified assets for debugging

### Production Optimizations
- Error logging to files
- Minified and compressed assets
- Security headers via .htaccess
- Database query optimization

## Getting Started

1. **Setup Database**: Ensure SQLite database exists with sample data
2. **Configure Web Server**: Apache/Nginx with PHP 7.4+
3. **Enable URL Rewriting**: Ensure .htaccess is processed
4. **Open Application**: Navigate to the domain root

The application will automatically load the SPA interface and begin making API calls to populate content dynamically.

## Key Differences from Monolithic Version

| Aspect | Monolithic | SPA |
|--------|------------|-----|
| **Page Loading** | Full page refresh | Dynamic content loading |
| **Navigation** | Server-side routing | Client-side routing |
| **Data Fetching** | PHP includes | AJAX API calls |
| **State Management** | Session/URL parameters | JavaScript state |
| **User Experience** | Page reloads | Smooth transitions |
| **Performance** | Server rendering | Client rendering + caching |
| **SEO** | Server-side HTML | Client-side rendering |
| **Scalability** | Monolithic scaling | API + Frontend separation |

This SPA architecture provides a modern, responsive user experience while maintaining the same functionality as the original monolithic application.