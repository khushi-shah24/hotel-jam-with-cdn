// Global variables
let currentSlide = 0;
let lightboxIndex = 0;
let filteredHotels = [];

// Slideshow functionality
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Hide current slide
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Calculate next slide
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Show new slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function currentSlideSet(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Hide current slide
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Set new slide
    currentSlide = index - 1;
    
    // Show new slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Auto-advance slideshow
function autoAdvanceSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 1) {
        setInterval(() => {
            changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }
}

// City search functionality
function filterCities() {
    const searchInput = document.getElementById('citySearch');
    const cityList = document.getElementById('cityList');
    const cities = cityList.querySelectorAll('li');
    
    if (!searchInput || !cityList) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    
    cities.forEach(city => {
        const cityName = city.textContent.toLowerCase();
        if (cityName.includes(searchTerm)) {
            city.style.display = 'block';
        } else {
            city.style.display = 'none';
        }
    });
}

// FAQ functionality
function showFAQCategory(category) {
    // Hide all sections
    const sections = document.querySelectorAll('.faq-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const selectedSection = document.getElementById(category);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    
    // Update active button
    const buttons = document.querySelectorAll('.faq-category');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Enhanced contact form validation
function validateContactForm() {
    const form = document.querySelector('.contact-form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject.value) {
        showError(subject, 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            showSuccessModal();
            form.reset();
        }, 2000);
    }
    
    return false; // Prevent actual form submission
}

function showError(input, message) {
    input.classList.add('error');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    const errorInputs = document.querySelectorAll('.error');
    const errorMessages = document.querySelectorAll('.error-message');
    
    errorInputs.forEach(input => input.classList.remove('error'));
    errorMessages.forEach(msg => msg.remove());
}

function showSuccessModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('successModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'successModal';
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="success-modal-content">
                <div class="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                <button class="modal-close-btn" onclick="closeSuccessModal()">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Gallery functionality
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter items
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        }
    });
}

function openLightbox(index) {
    lightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    
    if (!lightbox || !galleryData || !galleryData[index]) return;
    
    lightbox.classList.add('active');
    lightboxImage.src = galleryData[index].url;
    lightboxImage.alt = galleryData[index].title;
    lightboxTitle.textContent = galleryData[index].title;
    lightboxCategory.textContent = galleryData[index].category.charAt(0).toUpperCase() + galleryData[index].category.slice(1);
    
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function navigateLightbox(direction) {
    if (!galleryData) return;
    
    lightboxIndex += direction;
    
    if (lightboxIndex >= galleryData.length) {
        lightboxIndex = 0;
    } else if (lightboxIndex < 0) {
        lightboxIndex = galleryData.length - 1;
    }
    
    openLightbox(lightboxIndex);
}

// Enhanced video functionality
function initializeVideos() {
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playBtn = container.querySelector('.video-play-btn');
        
        if (!video || !playBtn) return;
        
        // Create custom controls
        createCustomVideoControls(container, video);
        
        // Play button click handler
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleVideoPlayback(video, playBtn);
        });
        
        // Video click handler
        video.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleVideoPlayback(video, playBtn);
        });
        
        // Video event listeners
        video.addEventListener('play', function() {
            playBtn.style.display = 'none';
            container.classList.add('playing');
        });
        
        video.addEventListener('pause', function() {
            playBtn.style.display = 'flex';
            container.classList.remove('playing');
        });
        
        video.addEventListener('ended', function() {
            playBtn.style.display = 'flex';
            container.classList.remove('playing');
            video.currentTime = 0;
        });
        
        // Preload metadata
        video.preload = 'metadata';
        
        // Error handling
        video.addEventListener('error', function(e) {
            console.error('Video error:', e);
            showVideoError(container);
        });
        
        video.addEventListener('loadstart', function() {
            container.classList.add('loading');
        });
        
        video.addEventListener('canplay', function() {
            container.classList.remove('loading');
        });
    });
}

function toggleVideoPlayback(video, playBtn) {
    if (video.paused) {
        // Pause all other videos first
        document.querySelectorAll('video').forEach(v => {
            if (v !== video && !v.paused) {
                v.pause();
            }
        });
        
        video.play().catch(error => {
            console.error('Video play failed:', error);
            showVideoError(video.closest('.video-container'));
        });
    } else {
        video.pause();
    }
}

function createCustomVideoControls(container, video) {
    // Create controls container
    const controls = document.createElement('div');
    controls.className = 'custom-video-controls';
    controls.innerHTML = `
        <div class="video-progress">
            <div class="video-progress-bar">
                <div class="video-progress-filled"></div>
            </div>
        </div>
        <div class="video-controls-buttons">
            <button class="video-control-btn play-pause">⏸️</button>
            <span class="video-time">0:00 / 0:00</span>
            <button class="video-control-btn volume">🔊</button>
            <button class="video-control-btn fullscreen">⛶</button>
        </div>
    `;
    
    container.appendChild(controls);
    
    // Add control functionality
    setupVideoControls(container, video, controls);
}

function setupVideoControls(container, video, controls) {
    const playPauseBtn = controls.querySelector('.play-pause');
    const progressBar = controls.querySelector('.video-progress-bar');
    const progressFilled = controls.querySelector('.video-progress-filled');
    const timeDisplay = controls.querySelector('.video-time');
    const volumeBtn = controls.querySelector('.volume');
    const fullscreenBtn = controls.querySelector('.fullscreen');
    
    // Play/Pause button
    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const playBtn = container.querySelector('.video-play-btn');
        toggleVideoPlayback(video, playBtn);
    });
    
    // Progress bar
    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = `${progress}%`;
        timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    });
    
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });
    
    // Volume button
    volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        volumeBtn.textContent = video.muted ? '🔇' : '🔊';
    });
    
    // Fullscreen button
    fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });
    
    // Update play/pause button
    video.addEventListener('play', () => {
        playPauseBtn.textContent = '⏸️';
    });
    
    video.addEventListener('pause', () => {
        playPauseBtn.textContent = '▶️';
    });
    
    // Show/hide controls on hover
    container.addEventListener('mouseenter', () => {
        if (!video.paused) {
            controls.style.opacity = '1';
        }
    });
    
    container.addEventListener('mouseleave', () => {
        controls.style.opacity = '0';
    });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function showVideoError(container) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'video-error';
    errorDiv.innerHTML = `
        <div class="error-message">
            <p>Unable to load video</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    container.appendChild(errorDiv);
}

// Products/Hotels functionality
function sortHotels() {
    const sortBy = document.getElementById('sortBy').value;
    const hotelsGrid = document.getElementById('hotelsGrid');
    const hotelCards = Array.from(hotelsGrid.children);
    
    hotelCards.sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return parseInt(b.dataset.rating) - parseInt(a.dataset.rating);
            case 'price-low':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'name':
                return a.dataset.name.localeCompare(b.dataset.name);
            default:
                return 0;
        }
    });
    
    hotelCards.forEach(card => {
        hotelsGrid.appendChild(card);
    });
}

function updatePriceFilter() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const hotelCards = document.querySelectorAll('.hotel-card');
    
    if (!priceRange || !priceValue) return;
    
    const maxPrice = parseInt(priceRange.value);
    priceValue.textContent = `Up to $${maxPrice}`;
    
    hotelCards.forEach(card => {
        const cardPrice = parseInt(card.dataset.price);
        if (cardPrice <= maxPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByRating(minRating) {
    const hotelCards = document.querySelectorAll('.hotel-card');
    const ratingButtons = document.querySelectorAll('.rating-btn');
    
    // Update active button
    ratingButtons.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
    
    hotelCards.forEach(card => {
        const cardRating = parseInt(card.dataset.rating);
        if (minRating === 0 || cardRating >= minRating) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function toggleFavorite(hotelId) {
    // In a real application, you would save this to local storage or send to server
    const button = event.target;
    if (button.textContent === '♡') {
        button.textContent = '♥';
        button.style.color = '#ef4444';
    } else {
        button.textContent = '♡';
        button.style.color = '';
    }
}

function shareHotel(hotelId) {
    // In a real application, you would implement actual sharing functionality
    if (navigator.share) {
        navigator.share({
            title: 'Check out this hotel!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Hotel link copied to clipboard!');
        }).catch(() => {
            alert('Unable to share. Please copy the URL manually.');
        });
    }
}

function bookHotel(hotelId) {
    // In a real application, you would navigate to booking page
    alert(`Booking functionality for hotel ID ${hotelId} would be implemented here.`);
}

// Smooth scrolling for anchor links
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip empty or invalid selectors
            if (!targetId || targetId === '#' || targetId.length <= 1) {
                return;
            }
            
            e.preventDefault();
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.hotel-card, .service-card, .review-card, .event-card, .gallery-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.classList.toggle('mobile-open');
    }
}

// Form enhancement
function enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add focus/blur effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Add real-time validation
            if (input.type === 'email') {
                input.addEventListener('blur', function() {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (this.value && !emailRegex.test(this.value)) {
                        showError(this, 'Please enter a valid email address');
                    } else {
                        this.classList.remove('error');
                        const errorMsg = this.parentNode.querySelector('.error-message');
                        if (errorMsg) errorMsg.remove();
                    }
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start slideshow
    autoAdvanceSlideshow();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Add smooth scrolling
    smoothScroll();
    
    // Enhance forms
    enhanceForms();
    
    // Initialize videos
    initializeVideos();
    
    // Add keyboard navigation for slideshow
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === 'Escape') {
            closeLightbox();
            closeSuccessModal();
        }
    });
    
    // Add touch support for mobile slideshow
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slideshow = document.querySelector('.slideshow-container');
    if (slideshow) {
        slideshow.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slideshow.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1); // Swipe left, go to next
            } else {
                changeSlide(-1); // Swipe right, go to previous
            }
        }
    }
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('successModal');
        if (modal && e.target === modal) {
            closeSuccessModal();
        }
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust slideshow height on mobile
    const slideshow = document.querySelector('.slideshow-container');
    if (slideshow && window.innerWidth < 768) {
        slideshow.style.height = '250px';
    } else if (slideshow) {
        slideshow.style.height = '500px';
    }
});

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Add custom video control styles
const videoStyles = `
<style>
.custom-video-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    color: white;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 5;
}

.video-container.playing .custom-video-controls {
    opacity: 1;
}

.video-progress {
    margin-bottom: 0.5rem;
}

.video-progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(255,255,255,0.3);
    border-radius: 2px;
    cursor: pointer;
}

.video-progress-filled {
    height: 100%;
    background: #3b82f6;
    border-radius: 2px;
    width: 0%;
    transition: width 0.1s ease;
}

.video-controls-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.video-control-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: background 0.3s ease;
}

.video-control-btn:hover {
    background: rgba(255,255,255,0.2);
}

.video-time {
    font-size: 0.9rem;
    margin-left: auto;
}

.video-error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 10;
}

.video-error .error-message {
    text-align: center;
    padding: 2rem;
    background: rgba(255,255,255,0.1);
    border-radius: 8px;
}

.video-error button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.video-container.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255,255,255,0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 5;
}
</style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', videoStyles);