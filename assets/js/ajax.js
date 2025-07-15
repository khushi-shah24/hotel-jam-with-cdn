// Traditional AJAX Implementation for Research Project
class AJAXClient {
    constructor() {
        this.baseURL = '/api';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // Core AJAX request method using XMLHttpRequest
    request(endpoint, options = {}) {
        return new Promise((resolve, reject) => {
            const url = `${this.baseURL}${endpoint}`;
            const cacheKey = `${options.method || 'GET'}_${url}_${JSON.stringify(options.data || {})}`;
            
            // Check cache for GET requests
            if (!options.method || options.method === 'GET') {
                const cached = this.cache.get(cacheKey);
                if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
                    resolve(cached.data);
                    return;
                }
            }

            // Create XMLHttpRequest object
            const xhr = new XMLHttpRequest();
            
            // Set up the request
            xhr.open(options.method || 'GET', url, true);
            
            // Set headers
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            
            if (options.headers) {
                Object.keys(options.headers).forEach(key => {
                    xhr.setRequestHeader(key, options.headers[key]);
                });
            }

            // Handle response
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            console.log('📦 Raw response from server:', xhr.responseText);
                            const data = JSON.parse(xhr.responseText);
                            
                            // Cache successful GET requests
                            if (!options.method || options.method === 'GET') {
                                this.cache.set(cacheKey, {
                                    data,
                                    timestamp: Date.now()
                                });
                            }
                            
                            resolve(data);
                        } catch (error) {
                            reject(new Error('Invalid JSON response'));
                        }
                    } else {
                        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                    }
                }
            }.bind(this);

            // Handle network errors
            xhr.onerror = function() {
                reject(new Error('Network error occurred'));
            };

            // Handle timeout
            xhr.ontimeout = function() {
                reject(new Error('Request timeout'));
            };

            // Set timeout (30 seconds)
            xhr.timeout = 30000;

            // Send the request
            if (options.data) {
                xhr.send(JSON.stringify(options.data));
            } else {
                xhr.send();
            }
        });
    }

    // GET request using AJAX
    get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url);
    }

    // POST request using AJAX
    post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            data: data
        });
    }

    // PUT request using AJAX
    put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            data: data
        });
    }

    // DELETE request using AJAX
    delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
    }

    // Clear expired cache entries
    clearExpiredCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (now - value.timestamp >= this.cacheTimeout) {
                this.cache.delete(key);
            }
        }
    }
}

// AJAX Service Classes
class HotelAJAX {
    constructor(client) {
        this.client = client;
    }

    async getCities() {
        return this.client.get('/cities');
    }

    async getHotels(params = {}) {
        return this.client.get('/hotels', params);
    }

    async getFeaturedHotels(limit = 5) {
        return this.client.get('/hotels/featured', { limit });
    }

    async getHotelById(id) {
        return this.client.get(`/hotels/${id}`);
    }

    async getHotelsByCity(city, params = {}) {
        return this.client.get('/hotels', { city, ...params });
    }

    async getTotalHotels(city = '') {
        return this.client.get('/hotels/count', city ? { city } : {});
    }
}

class ContentAJAX {
    constructor(client) {
        this.client = client;
    }

    async getPage(page) {
        return this.client.get(`/pages/${page}`);
    }

    async getGalleryImages() {
        return this.client.get('/gallery');
    }

    async getVideos() {
        return this.client.get('/videos');
    }

    async submitContact(data) {
        return this.client.post('/contact', data);
    }

    async getFAQs() {
        return this.client.get('/faq');
    }
}

// Initialize AJAX clients
const ajaxClient = new AJAXClient();
const hotelAJAX = new HotelAJAX(ajaxClient);
const contentAJAX = new ContentAJAX(ajaxClient);

// Export for global use
window.AJAX = {
    client: ajaxClient,
    hotels: hotelAJAX,
    content: contentAJAX
};

// Clean up expired cache every 10 minutes
setInterval(() => {
    ajaxClient.clearExpiredCache();
}, 10 * 60 * 1000);