// ============================================
// GLOBAL VARIABLES & INIT
// ============================================
let cartCount = 0;
let currentTestimonial = 0;

// ============================================
// UTILITY FUNCTIONS
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function showNotification(message, type = 'success') {
    // Simple notification system (can be expanded)
    alert(message);
}

// ============================================
// DOM READY INIT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initCart();
    initActiveNavLink();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Navbar scroll effects (throttled)
    window.addEventListener('scroll', throttle(handleNavbarScroll, 16));
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    document.querySelector('.hamburger').classList.remove('active');
    document.querySelector('.nav-menu').classList.remove('active');
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// ============================================
// CART FUNCTIONALITY
// ============================================
function initCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCounter = document.querySelector('.cart-count');
    
    if (!cartCounter) return;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}

function handleAddToCart(e) {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const price = productCard.dataset.price;
    
    cartCount++;
    updateCartCounter();
    
    // Visual feedback
    showAddToCartFeedback(e.target, productName);
    
    showNotification(`${productName} added to cart! (${cartCount} items)`);
}

function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-count');
    cartCounter.textContent = cartCount;
    cartCounter.style.display = 'flex';
}

function showAddToCartFeedback(button, productName) {
    const originalText = button.textContent;
    const originalBg = button.style.background;
    
    button.textContent = 'Added! ✓';
    button.style.background = '#4caf50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBg || '';
    }, 1500);
}

// ============================================
// ENHANCED GALLERY HOVER EFFECTS WITH DETAILS
// ============================================
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Add details overlay if not exists
        if (!item.querySelector('.gallery-details')) {
            createGalleryDetails(item);
        }
        
        item.addEventListener('mouseenter', handleGalleryHoverIn);
        item.addEventListener('mouseleave', handleGalleryHoverOut);
        item.addEventListener('mousemove', handleGalleryMouseMove);
    });
}

function createGalleryDetails(item) {
    const img = item.querySelector('img');
    const altText = img?.alt || 'Gallery Image';
    
    const details = document.createElement('div');
    details.className = 'gallery-details';
    details.innerHTML = `
        <h4>${altText}</h4>
        <p>Click to view full image</p>
        <span class="view-btn">View Details</span>
    `;
    
    item.appendChild(details);
}

function handleGalleryHoverIn(e) {
    const overlay = e.currentTarget.querySelector('.gallery-overlay');
    const details = e.currentTarget.querySelector('.gallery-details');
    
    if (overlay) {
        overlay.style.opacity = '1';
        overlay.style.transform = 'translateY(0)';
    }
    
    if (details) {
        details.style.opacity = '1';
        details.style.transform = 'translateY(0)';
        details.style.visibility = 'visible';
    }
}

function handleGalleryHoverOut(e) {
    const overlay = e.currentTarget.querySelector('.gallery-overlay');
    const details = e.currentTarget.querySelector('.gallery-details');
    
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(20px)';
    }
    
    if (details) {
        details.style.opacity = '0';
        details.style.transform = 'translateY(20px)';
    }
}

function handleGalleryMouseMove(e) {
    const details = e.currentTarget.querySelector('.gallery-details');
    if (details) {
        details.style.left = `${e.offsetX + 10}px`;
        details.style.top = `${e.offsetY - 20}px`;
    }
}

// ============================================
// FORMS
// ============================================
function initForms() {
    initContactForm();
    initNewsletterForm();
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactForm);
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    showNotification('Thank you for your message! We\'ll get back to you soon.');
    e.target.reset();
}

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', handleNewsletterForm);
}

function handleNewsletterForm(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    showNotification(`Thank you for subscribing with ${email}! 🎉\nCheck your inbox for 10% off!`);
    e.target.reset();
}

// ============================================
// SMOOTH SCROLLING & ANCHOR LINKS
// ============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Scroll indicator
    document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
        document.querySelector('.stats')?.scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// ANIMATIONS & INTERSECTION OBSERVER
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Animate individual elements
    document.querySelectorAll('.product-card, .gallery-item, .about-text, .contact-info').forEach(el => {
        setupAnimationElement(el);
        observer.observe(el);
    });
    
    // Animate sections
    document.querySelectorAll('.stats, .featured, .testimonials, .newsletter').forEach(el => {
        setupSectionAnimation(el);
        observer.observe(el);
    });
}

function setupAnimationElement(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
}

function setupSectionAnimation(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease';
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
        }
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const nextBtn = document.querySelector('.testimonial-next');
    const prevBtn = document.querySelector('.testimonial-prev');
    
    if (!testimonials.length) return;
    
    nextBtn?.addEventListener('click', () => {
        showTestimonial((currentTestimonial + 1) % testimonials.length);
    });
    
    prevBtn?.addEventListener('click', () => {
        showTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
    });
}

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', throttle(() => {
        backToTop.classList.toggle('show', window.scrollY > 300);
    }, 16));
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// ACTIVE NAV LINK
// ============================================
function initActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================
// MAIN INITIALIZATION
// ============================================
function initAll() {
    initNavigation();
    initCart();
    initGallery();
    initForms();
    initSmoothScrolling();
    initAnimations();
    initTestimonials();
    initBackToTop();
    initActiveNavLink();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', initAll);