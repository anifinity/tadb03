/* ----------------- DOM ELEMENTS ----------------- */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');

/* ----------------- INITIALIZATION ----------------- */
document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    setupScrollEffects();
});

/* ----------------- THEME MANAGEMENT ----------------- */
// Theme management is now handled by theme-manager.js

function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'default';
}

/* ----------------- EVENT LISTENERS ----------------- */
function setupEventListeners() {
    // Menu toggle
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Search toggle
    searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSearchBox();
    });
    
    // Theme toggle is now handled by theme-manager.js
    
    // Contact form
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            closeMobileMenu();
            closeSearchBox();
        }
    });
    
    // Close menus on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeSearchBox();
        }
    });
    
    // Responsive handling
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
            closeSearchBox();
        }
    });
}

function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ----------------- MOBILE MENU FUNCTIONS ----------------- */
function toggleMobileMenu() {
    closeSearchBox();
    
    if (mobileMenu.classList.contains('show')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileMenu.classList.add('show');
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    
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

function closeMobileMenu() {
    mobileMenu.classList.remove('show');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

/* ----------------- SEARCH BOX FUNCTIONS ----------------- */
function toggleSearchBox() {
    closeMobileMenu();
    
    if (searchBox.classList.contains('show')) {
        closeSearchBox();
    } else {
        openSearchBox();
    }
}

function openSearchBox() {
    searchBox.classList.add('show');
    searchToggle.innerHTML = '<i class="fas fa-times"></i>';
    
    setTimeout(() => {
        const searchInput = searchBox.querySelector('.search-input');
        searchInput.focus();
    }, 200);
}

function closeSearchBox() {
    searchBox.classList.remove('show');
    searchToggle.innerHTML = '<i class="fas fa-search"></i>';
}

/* ----------------- CONTACT FORM HANDLING ----------------- */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showSuccessMessage();
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateForm(data) {
    const errors = [];
    
    if (!data.name.trim()) {
        errors.push('Name is required');
    }
    
    if (!data.email.trim()) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject) {
        errors.push('Please select a subject');
    }
    
    if (!data.message.trim()) {
        errors.push('Message is required');
    }
    
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    // Remove existing success message if any
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message show';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Thank you for your message! We'll get back to you soon.
    `;
    
    // Insert before form
    const formSection = document.querySelector('.contact-form-section');
    formSection.parentNode.insertBefore(successMessage, formSection);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 5000);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ----------------- SYSTEM THEME DETECTION ----------------- */
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
        const themeOverride = localStorage.getItem('themeOverride');

        if (themeOverride !== 'true') {
            const newTheme = e.matches ? 'light' : 'default';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
}

/* ----------------- UTILITY FUNCTIONS ----------------- */
// Smooth scroll for anchor links
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

// Copy email to clipboard
function copyEmail() {
    const email = 'sivadoraemon33@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        // Show temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Email copied to clipboard!';
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--accent-primary);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-weight: 600;
        `;
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    });
}