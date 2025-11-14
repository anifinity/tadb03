// DOM Elements
let menuToggle, mobileMenu, themeToggle;

// Initialize DOM elements when page loads
function initializeDOMElements() {
    menuToggle = document.getElementById('menuToggle');
    mobileMenu = document.getElementById('mobileMenu');
    themeToggle = document.getElementById('themeToggle');
    
    console.log('DOM Elements:', {
        menuToggle: !!menuToggle,
        mobileMenu: !!mobileMenu,
        themeToggle: !!themeToggle
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeDOMElements();
    // initializeTheme(); - Now handled by theme-manager.js
    setupEventListeners();
    setupScrollAnimations();
    setupScrollEffects();
    updateStats();
});

// Theme Management - Now handled by theme-manager.js
function initializeTheme() {
    // Theme is now handled by theme-manager.js
    console.log('Theme initialization handled by theme-manager.js');
}

function toggleTheme() {
    // Theme toggle is now handled by theme-manager.js
    console.log('Theme toggle handled by theme-manager.js');
}

function updateThemeIcon(theme) {
    // Theme icon update is now handled by theme-manager.js
}

// Event Listeners
function setupEventListeners() {
    // Menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked');
            toggleMobileMenu();
        });
    }
    
    // Theme toggle - Now handled by theme-manager.js
    // if (themeToggle) {
    //     themeToggle.addEventListener('click', toggleTheme);
    // }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Responsive handling
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// Mobile menu functions
function toggleMobileMenu() {
    console.log('Toggle mobile menu clicked');
    if (mobileMenu && mobileMenu.classList.contains('show')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    console.log('Opening mobile menu');
    if (mobileMenu) {
        mobileMenu.classList.add('show');
        mobileMenu.style.display = 'block';
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        
        // Add stagger animation to menu items
        const menuItems = mobileMenu.querySelectorAll('.mobile-nav-link');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }
}

function closeMobileMenu() {
    console.log('Closing mobile menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('show');
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 300);
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Navbar scroll effects
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (window.scrollY > 50) {
            if (currentTheme === 'light') {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            }
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'var(--card-bg)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.mission-card, .feature-item, .team-card, .disclaimer-card');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.mission-card, .feature-item, .team-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Floating elements animation
function animateFloatingElements() {
    const elements = document.querySelectorAll('.float-element');
    
    elements.forEach((element, index) => {
        const delay = index * 0.5;
        const duration = 3 + (index * 0.5);
        
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
    });
}

// Initialize floating animation
document.addEventListener('DOMContentLoaded', animateFloatingElements);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.float-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Update stats with actual data
function updateStats() {
    // These numbers should match the actual data from your website
    const totalPosts = 25; // From movieData array
    const totalArtists = 5; // From voice artists page
    
    document.getElementById('totalPosts').textContent = totalPosts;
    document.getElementById('totalArtists').textContent = totalArtists;
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(parseInt(target));
        
        if (isNumber) {
            const targetNumber = parseInt(target.replace(/\D/g, ''));
            let current = 0;
            const increment = targetNumber / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    counter.textContent = targetNumber;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 50);
        }
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.about-hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance optimization - lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}