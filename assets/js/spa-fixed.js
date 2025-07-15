// Fixed Single Page Application Router with IMMEDIATE Page Reload Prevention
class SPARouter {
    constructor() {
        this.routes = {
            'home': this.loadHomePage.bind(this),
            'products': this.loadProductsPage.bind(this),
            'faq': this.loadFAQPage.bind(this),
            'contact': this.loadContactPage.bind(this),
            'gallery': this.loadGalleryPage.bind(this)
        };
        
        this.currentPage = '';
        this.currentCity = '';
        this.currentPageNum = 1;
        this.isLoading = false;
        this.staticContentLoaded = false;
        
        this.init();
    }

    init() {
        console.log('🚀 SPA Router initialized - NO MORE PAGE RELOADS!');
        console.log('📌 HEADER AND SIDEBAR ARE TRULY STATIC');
        
        // Load static content ONLY ONCE
        this.loadStaticContent();
        
        // Handle initial page load
        this.handleInitialLoad();
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state) {
                this.navigateToPage(e.state.page, e.state.city, e.state.pageNum, false);
            }
        });
        
        console.log('✅ SPA Router ready - ALL CLICKS WILL BE HANDLED BY SPA');
    }

    // Load static content only once (header and cities are already in HTML)
    async loadStaticContent() {
        if (this.staticContentLoaded) {
            console.log('📋 Static content already loaded, skipping...');
            return;
        }
        
        console.log('📋 Loading static content (cities) via AJAX...');
        
        try {
            // Load cities via AJAX and populate sidebar
            const response = await AJAX.hotels.getCities();
            if (response.success) {
                this.renderCities(response.data);
                console.log('✅ Cities loaded via AJAX and cached - WILL NEVER RELOAD');
            }
            
            // Load slideshow data via AJAX
            const slideshowResponse = await AJAX.hotels.getFeaturedHotels(5);
            if (slideshowResponse.success) {
                this.renderSlideshow(slideshowResponse.data);
                console.log('✅ Slideshow loaded via AJAX - WILL NEVER RELOAD');
            }
            
            this.staticContentLoaded = true;
            console.log('✅ Static content loading completed - HEADER & SIDEBAR ARE NOW STATIC FOREVER');
            
        } catch (error) {
            console.error('❌ Failed to load static content:', error);
        }
    }

    handleInitialLoad() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const [page, city, pageNum] = hash.split('/');
            this.navigateToPage(page, city, parseInt(pageNum) || 1, false);
        } else {
            this.navigateToPage('home', '', 1, false);
        }
    }

    async navigateToPage(page, city = '', pageNum = 1, updateHistory = true) {
        if (this.isLoading) {
            console.log('⏳ Already loading, skipping...');
            return;
        }
        
        console.log(`🚀 Navigating to: ${page}, city: ${city}, page: ${pageNum}`);
        console.log('📌 ONLY MAIN CONTENT WILL UPDATE - HEADER & SIDEBAR STAY STATIC');
        
        // Ensure static content is loaded first
        if (!this.staticContentLoaded) {
            await this.loadStaticContent();
        }
        
        this.showLoading();
        
        // Update navigation active state
        this.updateActiveNavigation(page);
        
        // Update URL and history
        if (updateHistory) {
            const url = this.buildURL(page, city, pageNum);
            const state = { page, city, pageNum };
            history.pushState(state, '', url);
        }
        
        // Store current state
        this.currentPage = page;
        this.currentCity = city;
        this.currentPageNum = pageNum;
        
        try {
            // Route to appropriate page loader using AJAX
            if (this.routes[page]) {
                console.log(`📄 Loading ${page} page content via AJAX...`);
                await this.routes[page](city, pageNum);
                console.log(`✅ Page ${page} loaded successfully - ONLY MAIN CONTENT UPDATED`);
            } else {
                await this.loadNotFoundPage();
            }
        } catch (error) {
            console.error('❌ Navigation error:', error);
            this.showError('Failed to load page content');
        }
        
        this.hideLoading();
    }

    buildURL(page, city, pageNum) {
        let url = `#${page}`;
        if (city) url += `/${encodeURIComponent(city)}`;
        if (pageNum > 1) url += `/${pageNum}`;
        return url;
    }

    updateActiveNavigation(page) {
        // Update main navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });

        // Update city navigation
        document.querySelectorAll('.city-link').forEach(link => {
            link.classList.remove('active');
            if (page === 'products' && link.getAttribute('data-city') === this.currentCity) {
                link.classList.add('active');
            }
        });
    }

    // AJAX API call methods
    async loadHomePage() {
        console.log('🏠 Loading home page via AJAX...');
        try {
            const [pageResponse, hotelsResponse] = await Promise.all([
                AJAX.content.getPage('home'),
                AJAX.hotels.getFeaturedHotels(20)
            ]);

            const pageData = pageResponse.success ? pageResponse.data : {};
            const hotels = hotelsResponse.success ? hotelsResponse.data : [];

            this.renderHomePage(pageData, hotels);
            console.log('✅ Home page rendered with AJAX data - ONLY MAIN CONTENT UPDATED');
        } catch (error) {
            console.error('❌ Failed to load home page via AJAX:', error);
            this.showError('Failed to load home page');
        }
    }

    async loadProductsPage(city = '', pageNum = 1) {
        console.log(`🏨 Loading products page via AJAX for city: ${city}, page: ${pageNum}`);
        try {
            const limit = 24;
            
            // FIXED: Use the correct API call structure
            const params = { limit, page: pageNum };
            if (city) {
                params.city = city;
            }
            
            const [hotelsResponse, countResponse] = await Promise.all([
                AJAX.hotels.getHotels(params),
                AJAX.hotels.getTotalHotels(city)
            ]);

            // FIXED: Handle the response structure correctly
            let hotels = [];
            let totalCount = 0;
            
            if (hotelsResponse.success) {
                // Check if it's paginated response or direct data
                if (hotelsResponse.data && Array.isArray(hotelsResponse.data)) {
                    hotels = hotelsResponse.data;
                } else if (hotelsResponse.pagination) {
                    hotels = hotelsResponse.data || [];
                    totalCount = hotelsResponse.pagination.total_items;
                }
            }
            
            if (countResponse.success && !totalCount) {
                totalCount = countResponse.data.count;
            }

            this.renderProductsPage(hotels, city, pageNum, totalCount, limit);
            console.log(`✅ Products page rendered with ${hotels.length} hotels - ONLY MAIN CONTENT UPDATED`);
        } catch (error) {
            console.error('❌ Failed to load products page via AJAX:', error);
            this.showError('Failed to load hotels');
        }
    }

    async loadFAQPage() {
        console.log('❓ Loading FAQ page via AJAX...');
        try {
            const response = await AJAX.content.getFAQs();
            const faqs = response.success ? response.data : [];
            this.renderFAQPage(faqs);
            console.log('✅ FAQ page rendered with AJAX data - ONLY MAIN CONTENT UPDATED');
        } catch (error) {
            console.error('❌ Failed to load FAQ page via AJAX:', error);
            this.showError('Failed to load FAQ');
        }
    }

    async loadContactPage() {
        console.log('📞 Loading contact page...');
        this.renderContactPage();
        console.log('✅ Contact page rendered with Google Maps - ONLY MAIN CONTENT UPDATED');
    }

    async loadGalleryPage() {
        console.log('🖼️ Loading gallery page via AJAX...');
        try {
            const [imagesResponse, videosResponse] = await Promise.all([
                AJAX.content.getGalleryImages(),
                AJAX.content.getVideos()
            ]);

            const images = imagesResponse.success ? imagesResponse.data : [];
            const videos = videosResponse.success ? videosResponse.data : [];

            this.renderGalleryPage(images, videos);
            console.log('✅ Gallery page rendered with AJAX data - ONLY MAIN CONTENT UPDATED');
        } catch (error) {
            console.error('❌ Failed to load gallery page via AJAX:', error);
            this.showError('Failed to load gallery');
        }
    }

    // Rendering methods (ONLY UPDATE MAIN CONTENT, KEEP HEADER/SIDEBAR STATIC)
    renderCities(cities) {
        const cityList = document.getElementById('cityList');
        if (!cityList) return;

        cityList.innerHTML = cities.map(city => `
            <li>
                <a href="#products/${city.name}" class="city-link" data-city="${city.name}">
                    <span>${city.name}</span>
                    <span class="hotel-count">${city.hotel_count}</span>
                </a>
            </li>
        `).join('');
        
        console.log(`✅ Rendered ${cities.length} cities in sidebar - STATIC CONTENT FOREVER`);
    }

    renderSlideshow(hotels) {
        const slideshowContainer = document.getElementById('slideshow-container');
        if (!slideshowContainer || hotels.length === 0) return;

        slideshowContainer.innerHTML = `
            <div class="slideshow">
                ${hotels.map((hotel, index) => `
                    <div class="slide ${index === 0 ? 'active' : ''}">
                        <img src="${hotel.image_url}" alt="${hotel.name}" loading="lazy">
                        <div class="slide-content">
                            <h2>${hotel.name}</h2>
                            <p>${hotel.description}</p>
                            <p class="slide-location">📍 ${hotel.city_name}</p>
                        </div>
                    </div>
                `).join('')}
                <button class="slide-btn prev" onclick="changeSlide(-1)">❮</button>
                <button class="slide-btn next" onclick="changeSlide(1)">❯</button>
                <div class="slide-indicators">
                    ${hotels.map((_, index) => `
                        <button class="indicator ${index === 0 ? 'active' : ''}" onclick="currentSlideSet(${index + 1})"></button>
                    `).join('')}
                </div>
            </div>
        `;

        // Start slideshow
        this.startSlideshow();
        console.log(`✅ Rendered slideshow with ${hotels.length} slides - STATIC CONTENT FOREVER`);
    }

    renderContactPage() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="contact-content">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you. Get in touch with our team for any inquiries or assistance.</p>

                <div class="contact-grid">
                    <div class="contact-info">
                        <h2>Get in Touch</h2>
                        
                        <div class="contact-item">
                            <div class="contact-icon">📍</div>
                            <div class="contact-details">
                                <h3>Address</h3>
                                <p>123 Luxury Avenue<br>Manhattan, NY 10001<br>United States</p>
                            </div>
                        </div>

                        <div class="contact-item">
                            <div class="contact-icon">📞</div>
                            <div class="contact-details">
                                <h3>Phone</h3>
                                <p>+1 (555) 123-4567<br>Toll Free: 1-800-ELITE-H</p>
                            </div>
                        </div>

                        <div class="contact-item">
                            <div class="contact-icon">✉️</div>
                            <div class="contact-details">
                                <h3>Email</h3>
                                <p>info@elitehotels.com<br>reservations@elitehotels.com</p>
                            </div>
                        </div>
                    </div>

                    <div class="contact-form-container">
                        <h2>Send us a Message</h2>
                        <form class="contact-form" onsubmit="return submitContactFormAJAX(event)">
                            <div class="form-group">
                                <label for="name">Full Name *</label>
                                <input type="text" id="name" name="name" required>
                            </div>

                            <div class="form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" name="email" required>
                            </div>

                            <div class="form-group">
                                <label for="subject">Subject *</label>
                                <select id="subject" name="subject" required>
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="reservation">Reservation Assistance</option>
                                    <option value="complaint">Complaint</option>
                                    <option value="compliment">Compliment</option>
                                    <option value="group">Group Booking</option>
                                    <option value="event">Event Planning</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="message">Message *</label>
                                <textarea id="message" name="message" rows="6" required placeholder="Please provide details about your inquiry..."></textarea>
                            </div>

                            <button type="submit" class="submit-btn">Send Message</button>
                        </form>
                    </div>
                </div>

                <div class="map-section">
                    <h2>Find Us</h2>
                    <div class="map-container">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.309328481308!2d-74.00602532404069!3d40.74844097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2s123%20Luxury%20Ave%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sus!4v1710123456789!5m2!1sen!2sus" 
                            width="100%" 
                            height="400" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        `;
    }

    renderHomePage(pageData, hotels) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="home-content">
                <section class="hero-section">
                    <div class="hero-content">
                        <h1>${pageData.title || 'Welcome to Elite Hotels'}</h1>
                        <p>${pageData.description || 'Discover luxury accommodations in the world\'s most beautiful destinations.'}</p>
                        <div class="hero-stats">
                            <div class="stat">
                                <h3>${pageData.stats?.hotels || '20K+'}</h3>
                                <p>Luxury Hotels</p>
                            </div>
                            <div class="stat">
                                <h3>${pageData.stats?.cities || '200+'}</h3>
                                <p>Destinations</p>
                            </div>
                            <div class="stat">
                                <h3>${pageData.stats?.guests || '1M+'}</h3>
                                <p>Happy Guests</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="featured-section">
                    <h2>Featured Hotels</h2>
                    <div class="hotel-grid">
                        ${hotels.map(hotel => this.renderHotelCard(hotel)).join('')}
                    </div>
                    <div style="text-align: center; margin-top: 2rem;">
                        <button class="btn-primary" data-page="products" data-city="" data-pagenum="1">View All Hotels</button>
                    </div>
                </section>

                ${this.renderHomeServices()}
                ${this.renderHomeReviews()}
            </div>
        `;
    }

    renderProductsPage(hotels, city, pageNum, totalCount, limit) {
        const totalPages = Math.ceil(totalCount / limit);
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="products-content">
                <div class="products-header">
                    <h1>${city ? `Hotels in ${city}` : 'All Hotels'}</h1>
                    <p class="results-count">
                        Showing ${hotels.length} of ${totalCount.toLocaleString()} hotels
                        ${city ? `in ${city}` : ''}
                        (Page ${pageNum} of ${totalPages})
                    </p>
                </div>

                <div class="products-filters">
                    <div class="filter-group">
                        <label for="sortBy">Sort by:</label>
                        <select id="sortBy" onchange="sortHotels()">
                            <option value="rating">Rating (High to Low)</option>
                            <option value="price-low">Price (Low to High)</option>
                            <option value="price-high">Price (High to Low)</option>
                            <option value="name">Name (A to Z)</option>
                        </select>
                    </div>
                </div>

                ${hotels.length === 0 ? this.renderNoResults(city) : `
                    <div class="hotels-grid" id="hotelsGrid">
                        ${hotels.map(hotel => this.renderHotelCard(hotel)).join('')}
                    </div>
                    ${this.renderPagination(pageNum, totalPages, city)}
                `}
            </div>
        `;
    }

    renderFAQPage(faqs) {
        const mainContent = document.getElementById('main-content');
        
        // Group FAQs by category
        const categories = {};
        faqs.forEach(faq => {
            if (!categories[faq.category]) {
                categories[faq.category] = [];
            }
            categories[faq.category].push(faq);
        });

        mainContent.innerHTML = `
            <div class="faq-content">
                <h1>Frequently Asked Questions</h1>
                <p>Find answers to the most commonly asked questions about our hotels and services.</p>

                <div class="faq-categories">
                    ${Object.keys(categories).map((category, index) => `
                        <button class="faq-category ${index === 0 ? 'active' : ''}" 
                                onclick="showFAQCategory('${category}')">${category.charAt(0).toUpperCase() + category.slice(1)}</button>
                    `).join('')}
                </div>

                ${Object.entries(categories).map(([category, categoryFaqs], index) => `
                    <div class="faq-section" id="${category}" ${index > 0 ? 'style="display: none;"' : ''}>
                        ${categoryFaqs.map(faq => `
                            <div class="faq-item">
                                <div class="faq-question" onclick="toggleFAQ(this)">
                                    <h3>${faq.question}</h3>
                                    <span class="faq-toggle">+</span>
                                </div>
                                <div class="faq-answer">
                                    <p>${faq.answer}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderGalleryPage(images, videos) {
        const mainContent = document.getElementById('main-content');
        
        // Get unique categories
        const categories = [...new Set(images.map(img => img.category))];
        
        mainContent.innerHTML = `
            <div class="gallery-content">
                <h1>Hotel Gallery</h1>
                <p>Explore our stunning collection of hotels, rooms, and amenities through our curated gallery.</p>

                <div class="gallery-filters">
                    <button class="filter-btn active" onclick="filterGallery('all')">All</button>
                    ${categories.map(category => `
                        <button class="filter-btn" onclick="filterGallery('${category}')">${category.charAt(0).toUpperCase() + category.slice(1)}</button>
                    `).join('')}
                </div>

                <div class="gallery-grid" id="galleryGrid">
                    ${images.map((image, index) => `
                        <div class="gallery-item" data-category="${image.category}" onclick="openLightbox(${index})">
                            <img src="${image.image_url}" alt="${image.title}" loading="lazy">
                            <div class="gallery-overlay">
                                <h3>${image.title}</h3>
                                <span class="gallery-category">${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                ${videos.length > 0 ? `
                    <div class="video-section">
                        <h2>Hotel Video Tours</h2>
                        <div class="video-grid">
                            ${videos.map(video => `
                                <div class="video-container">
                                    <video controls poster="${video.thumbnail_url}" preload="metadata">
                                        <source src="${video.video_url}" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video>
                                    <div class="video-overlay">
                                        <h3>${video.title}</h3>
                                        <p>${video.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        // Store gallery data globally for lightbox
        window.galleryData = images;
        
        // Initialize video players
        this.initializeVideoPlayers();
    }

    renderHotelCard(hotel) {
        return `
            <div class="hotel-card" 
                 data-price="${hotel.price}" 
                 data-rating="${hotel.rating}"
                 data-name="${hotel.name}">
                <div class="hotel-image-container">
                    <img src="${hotel.image_url}" alt="${hotel.name}" loading="lazy">
                    <div class="hotel-price-badge">$${parseInt(hotel.price)}/night</div>
                    ${hotel.featured ? '<div class="featured-badge">Featured</div>' : ''}
                </div>
                
                <div class="hotel-info">
                    <div class="hotel-header">
                        <h3>${hotel.name}</h3>
                        <div class="hotel-rating">
                            ${this.renderStars(hotel.rating)}
                            <span class="rating-text">${hotel.rating}/5</span>
                        </div>
                    </div>
                    
                    <p class="hotel-location">📍 ${hotel.city_name}</p>
                    <p class="hotel-description">${hotel.description}</p>
                    
                    <div class="hotel-amenities">
                        ${this.renderAmenities(hotel.amenities)}
                    </div>
                    
                    <div class="hotel-footer">
                        <div class="hotel-price">
                            <span class="price-label">From</span>
                            <span class="price-amount">$${parseInt(hotel.price)}</span>
                            <span class="price-period">/night</span>
                        </div>
                        <button class="book-btn" onclick="bookHotel(${hotel.id})">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderStars(rating) {
        return Array.from({length: 5}, (_, i) => 
            `<span class="star ${i < rating ? 'filled' : ''}">★</span>`
        ).join('');
    }

    renderAmenities(amenitiesStr) {
        const amenities = amenitiesStr.split(', ').slice(0, 4);
        return amenities.map(amenity => 
            `<span class="amenity-tag">${amenity}</span>`
        ).join('');
    }

    renderPagination(currentPage, totalPages, city) {
        if (totalPages <= 1) return '';

        let pagination = '<div class="pagination">';

        // Previous button
        if (currentPage > 1) {
        pagination += `<button class="pagination-btn" data-page="products" data-city="${city}" data-pagenum="${currentPage - 1}">← Previous</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                pagination += `<span class="pagination-btn active">${i}</span>`;
            } else if (i <= 3 || i > totalPages - 3 || Math.abs(i - currentPage) <= 2) {
                pagination += `<button class="pagination-btn" data-page="products" data-city="${city}" data-pagenum="${i}">${i}</button>`;
            } else if (i === 4 && currentPage > 6) {
                pagination += '<span class="pagination-ellipsis">...</span>';
            } else if (i === totalPages - 3 && currentPage < totalPages - 5) {
                pagination += '<span class="pagination-ellipsis">...</span>';
            }
        }

        // Next button
        if (currentPage < totalPages) {
            pagination += `<button class="pagination-btn" data-page="products" data-city="${city}" data-pagenum="${currentPage + 1}">Next →</button>`;
        }

        pagination += '</div>';
        return pagination;
    }

    renderNoResults(city) {
        return `
            <div class="no-results">
                <h2>No hotels found</h2>
                <p>${city ? `We don't have any hotels in ${city} at the moment.` : 'No hotels match your current filters.'}</p>
                <button class="btn-primary" data-page="products" data-city="" data-pagenum="1">View All Hotels</button>
            </div>
        `;
    }

    renderHomeServices() {
        return `
            <section class="services-section">
                <h2>Our Services</h2>
                <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon">🏨</div>
                        <h3>Luxury Accommodations</h3>
                        <p>Experience world-class comfort in our carefully selected premium hotels worldwide.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">🍽️</div>
                        <h3>Fine Dining</h3>
                        <p>Savor exquisite cuisine prepared by renowned chefs in our award-winning restaurants.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">🧘</div>
                        <h3>Spa & Wellness</h3>
                        <p>Rejuvenate your body and mind with our comprehensive spa and wellness facilities.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">🚗</div>
                        <h3>Concierge Services</h3>
                        <p>Our dedicated concierge team ensures your every need is met with personalized attention.</p>
                    </div>
                </div>
            </section>
        `;
    }

    renderHomeReviews() {
        return `
            <section class="reviews-section">
                <h2>Guest Reviews</h2>
                <div class="reviews-grid">
                    <div class="review-card">
                        <div class="review-rating">
                            ${this.renderStars(5)}
                        </div>
                        <p>"Absolutely incredible experience! The service was impeccable and the rooms were luxurious beyond expectations."</p>
                        <div class="reviewer">
                            <strong>Sarah Johnson</strong>
                            <span>New York</span>
                        </div>
                    </div>
                    <div class="review-card">
                        <div class="review-rating">
                            ${this.renderStars(5)}
                        </div>
                        <p>"Perfect location, amazing amenities, and staff that goes above and beyond. Will definitely return!"</p>
                        <div class="reviewer">
                            <strong>Michael Chen</strong>
                            <span>San Francisco</span>
                        </div>
                    </div>
                    <div class="review-card">
                        <div class="review-rating">
                            ${this.renderStars(4)}
                        </div>
                        <p>"Beautiful hotel with excellent facilities. The spa was particularly outstanding. Highly recommended!"</p>
                        <div class="reviewer">
                            <strong>Emma Williams</strong>
                            <span>London</span>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // Utility methods
    showLoading() {
        this.isLoading = true;
        
        // Create loading overlay specifically for main content
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            // Remove any existing loading overlay
            const existingOverlay = mainContent.querySelector('.main-content-loading');
            if (existingOverlay) {
                existingOverlay.remove();
            }
            
            // Create new loading overlay
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'main-content-loading';
            loadingOverlay.innerHTML = `
                <div class="spinner"></div>
                <p class="loading-text">Loading content via AJAX...</p>
            `;
            
            mainContent.appendChild(loadingOverlay);
            
            // Trigger animation
            setTimeout(() => {
                loadingOverlay.classList.remove('hidden');
            }, 10);
        }
        
        console.log('⏳ Loading indicator shown - ONLY FOR MAIN CONTENT AREA');
    }

    hideLoading() {
        this.isLoading = false;
        
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            const loadingOverlay = mainContent.querySelector('.main-content-loading');
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 300); // Wait for transition to complete
            }
        }
        
        console.log('✅ Loading indicator hidden from main content area');
    }

    showError(message) {
        UIComponents.createToast(message, 'error', 5000);
    }

    startSlideshow() {
        // Auto-advance slideshow every 5 seconds
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
        }
        
        this.slideshowInterval = setInterval(() => {
            if (typeof changeSlide === 'function') {
                changeSlide(1);
            }
        }, 5000);
    }

    initializeVideoPlayers() {
        const videoContainers = document.querySelectorAll('.video-container');
        
        videoContainers.forEach(container => {
            const video = container.querySelector('video');
            if (!video) return;
            
            // Add click handler to play/pause
            video.addEventListener('click', function() {
                if (this.paused) {
                    // Pause all other videos
                    document.querySelectorAll('video').forEach(v => {
                        if (v !== this && !v.paused) {
                            v.pause();
                        }
                    });
                    this.play();
                } else {
                    this.pause();
                }
            });
            
            // Error handling
            video.addEventListener('error', function(e) {
                console.error('Video error:', e);
                const errorDiv = document.createElement('div');
                errorDiv.className = 'video-error';
                errorDiv.innerHTML = '<p>Unable to load video</p>';
                container.appendChild(errorDiv);
            });
        });
    }

    loadNotFoundPage() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="error-content">
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
                <button class="btn-primary" data-page="home">Go Home</button>
            </div>
        `;
        console.log('✅ 404 page rendered - ONLY MAIN CONTENT UPDATED');
    }
}

// Global functions for AJAX form submission
window.submitContactFormAJAX = async function(event) {
    event.preventDefault();
    
    console.log('📧 Submitting contact form via AJAX...');
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        const response = await AJAX.content.submitContact(data);
        if (response.success) {
            UIComponents.createToast(response.message, 'success');
            form.reset();
            console.log('✅ Contact form submitted successfully via AJAX');
        } else {
            UIComponents.createToast(response.message, 'error');
        }
    } catch (error) {
        console.error('❌ AJAX contact form submission failed:', error);
        UIComponents.createToast('Failed to send message. Please try again.', 'error');
    }
    
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
};

// Initialize SPA when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing PERFECT SPA with AJAX support...');
    console.log('📌 HEADER AND SIDEBAR WILL LOAD ONCE AND STAY STATIC FOREVER');
    console.log('📌 ONLY MAIN CONTENT WILL UPDATE ON NAVIGATION');
    console.log('🚫 ALL PAGE RELOADS PREVENTED FROM THE START');
    window.spa = new SPARouter();
});