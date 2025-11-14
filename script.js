// Load posts from central manager
let movieData = [];

// Pagination variables
let currentPage = 1;
const itemsPerPage = window.innerWidth <= 768 ? 20 : 20;
let totalPages = Math.ceil(movieData.length / itemsPerPage);

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const themeToggle = document.getElementById('themeToggle');
const movieGrid = document.getElementById('movieGrid');
const pagination = document.getElementById('pagination');

// Initialize the app
document.addEventListener('DOMContentLoaded', async function() {
    // Load posts from central manager
    if (window.postsManager) {
        // Wait for posts to load from JSON
        movieData = await window.postsManager.getAllPosts();
        console.log(`📊 Loaded ${movieData.length} posts for display`);
    }
    
    renderMovies();
    renderPagination();
    setupEventListeners();
    setupScrollEffects();
    updateHeroStats();
    updateNewsDate();
    initPosterSlider();
});

// Navbar scroll effects
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

// Theme management is now handled by theme-manager.js

// Movie Rendering
function renderMovies() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMovies = movieData.slice(startIndex, endIndex);
    
    movieGrid.innerHTML = '';
    
    currentMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieGrid.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.onclick = () => openMovieDetails(movie.id);
    
    // Check if season contains "Movie" to add movie-badge class
    const seasonClass = movie.season.toLowerCase().includes('movie') ? 'season-badge movie-badge' : 'season-badge';
    
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
            <h3 class="movie-title" title="${movie.title}">${movie.title}</h3>
            <div class="movie-meta">
                <span class="year-badge">${movie.year}</span>
                <span class="${seasonClass}">${movie.season}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Pagination
function renderPagination() {
    totalPages = Math.ceil(movieData.length / itemsPerPage);
    pagination.innerHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        const prevBtn = createPageButton('‹', currentPage - 1);
        pagination.appendChild(prevBtn);
    }
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i, i);
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pagination.appendChild(pageBtn);
    }
    
    // Next button
    if (currentPage < totalPages) {
        const nextBtn = createPageButton('›', currentPage + 1);
        pagination.appendChild(nextBtn);
    }
}

function createPageButton(text, page) {
    const button = document.createElement('button');
    button.className = 'page-btn';
    button.textContent = text;
    button.onclick = () => goToPage(page);
    return button;
}

function goToPage(page) {
    currentPage = page;
    renderMovies();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event Listeners
function setupEventListeners() {
    // Menu toggle with smooth animation
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Search toggle with smooth animation
    searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSearchBox();
    });
    
    // Theme toggle is now handled by theme-manager.js
    
    // Search functionality
    const searchInput = searchBox.querySelector('.search-input');
    searchInput.addEventListener('input', handleSearch);
    
    // Search button functionality
    const searchBtn = searchBox.querySelector('.search-btn');
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            handleSearch({ target: { value: query } });
        }
    });
    
    // Enter key search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                handleSearch({ target: { value: query } });
            }
        }
    });
    
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
        renderMovies();
        renderPagination();
        // Close mobile menu on desktop
        if (window.innerWidth > 768) {
            closeMobileMenu();
            closeSearchBox();
        }
    });
}

// Mobile menu animation functions
function toggleMobileMenu() {
    closeSearchBox(); // Close search if open
    
    if (mobileMenu.classList.contains('show')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileMenu.classList.add('show');
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

function closeMobileMenu() {
    mobileMenu.classList.remove('show');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

// Search box animation functions
function toggleSearchBox() {
    closeMobileMenu(); // Close menu if open
    
    if (searchBox.classList.contains('show')) {
        closeSearchBox();
    } else {
        openSearchBox();
    }
}

function openSearchBox() {
    searchBox.classList.add('show');
    searchToggle.innerHTML = '<i class="fas fa-times"></i>';
    
    // Focus on input with delay for smooth animation
    setTimeout(() => {
        const searchInput = searchBox.querySelector('.search-input');
        searchInput.focus();
    }, 200);
}

function closeSearchBox() {
    searchBox.classList.remove('show');
    searchToggle.innerHTML = '<i class="fas fa-search"></i>';
    
    // Clear search results and show normal content
    const searchInput = searchBox.querySelector('.search-input');
    searchInput.value = '';
    document.body.classList.remove('searching');
    document.getElementById('searchResults').classList.remove('active');
    renderMovies();
    renderPagination();
    pagination.style.display = 'flex';
}

// Search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Clear search - show normal content
        document.body.classList.remove('searching');
        document.getElementById('searchResults').classList.remove('active');
        renderMovies();
        renderPagination();
        pagination.style.display = 'flex';
        return;
    }
    
    // Filter movies by title, categories, and labels
    const filteredMovies = movieData.filter(movie => {
        const titleMatch = movie.title.toLowerCase().includes(searchTerm);
        const categoryMatch = movie.categories && movie.categories.some(cat => 
            cat.toLowerCase().includes(searchTerm)
        );
        const labelMatch = movie.labels && movie.labels.some(label => 
            label.toLowerCase().includes(searchTerm)
        );
        
        return titleMatch || categoryMatch || labelMatch;
    });
    
    // Show search results
    showSearchResults(filteredMovies, e.target.value);
}



// Common function to show search results
function showSearchResults(filteredMovies, searchQuery) {
    console.log('Showing search results for:', searchQuery, 'with', filteredMovies.length, 'movies');
    
    // Show search results section
    document.body.classList.add('searching');
    const searchResultsSection = document.getElementById('searchResults');
    
    if (searchResultsSection) {
        searchResultsSection.classList.add('active');
        console.log('Search results section is now active');
    } else {
        console.error('Search results section not found!');
        return;
    }
    
    // Update search results
    const searchMovieGrid = document.getElementById('searchMovieGrid');
    const searchResultsTitle = document.getElementById('searchResultsTitle');
    const searchResultsCount = document.getElementById('searchResultsCount');
    const noResults = document.getElementById('noResults');
    
    console.log('Elements found:', {
        searchMovieGrid: !!searchMovieGrid,
        searchResultsTitle: !!searchResultsTitle,
        searchResultsCount: !!searchResultsCount,
        noResults: !!noResults
    });
    
    if (searchResultsTitle) {
        searchResultsTitle.textContent = `Search Results for "${searchQuery}"`;
        console.log('Updated title to:', searchResultsTitle.textContent);
    }
    
    if (searchResultsCount) {
        searchResultsCount.textContent = `${filteredMovies.length} result(s) found`;
        console.log('Updated count to:', searchResultsCount.textContent);
    }
    
    if (filteredMovies.length === 0) {
        if (searchMovieGrid) {
            searchMovieGrid.innerHTML = '';
        }
        if (noResults) {
            noResults.style.display = 'block';
        }
        console.log('No results to display');
    } else {
        if (noResults) {
            noResults.style.display = 'none';
        }
        if (searchMovieGrid) {
            searchMovieGrid.innerHTML = '';
            console.log('Creating cards for movies:', filteredMovies.map(m => m.title));
            filteredMovies.forEach(movie => {
                const movieCard = createMovieCard(movie);
                searchMovieGrid.appendChild(movieCard);
            });
            console.log('Added', filteredMovies.length, 'movie cards to grid');
        }
    }
    
    // Hide pagination during search
    if (pagination) {
        pagination.style.display = 'none';
    }
    
    // Force scroll to search results
    setTimeout(() => {
        const searchResultsElement = document.getElementById('searchResults');
        if (searchResultsElement) {
            console.log('Scrolling to search results...');
            searchResultsElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 100);
}





// Clear search function
function clearSearch() {
    // Clear search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Hide search results and show normal content
    document.body.classList.remove('searching');
    document.getElementById('searchResults').classList.remove('active');
    renderMovies();
    renderPagination();
    pagination.style.display = 'flex';
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Movie details (placeholder for navigation to post page)
function openMovieDetails(movieId) {
    // Store movie ID for the post page
    localStorage.setItem('selectedMovieId', movieId);
    // Navigate to post page
    window.location.href = 'post.html';
}

// Smooth scrolling for navigation links
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

// Automatic counting functionality for hero stats with animation
function updateHeroStats() {
    // Count posts from featured movieData array
    const postsCount = movieData.length; // Dynamically counts all featured posts
    
    // Count voice artists from voice-artists-real.html (Sai Sujith, Kedharnath, Govardhiniprakash, Sai Abhijith, Rajyalaksmi Yadav = 5 artists)
    const artistsCount = 5;
    
    // Animate counting for posts
    animateCounter('postsCount', postsCount, '+', 1000);
    
    // Animate counting for artists
    animateCounter('artistsCount', artistsCount, '+', 1200);
    
    // Total visits is handled by Firebase, but we can add animation to it too
    // The Firebase script will update the actual value, but we can animate the display
    setTimeout(() => {
        const totalVisitsElement = document.getElementById('totalVisits');
        if (totalVisitsElement && !totalVisitsElement.textContent.includes('+')) {
            // Only add + if it doesn't already have it from Firebase
            const currentValue = totalVisitsElement.textContent;
            if (currentValue && !isNaN(parseInt(currentValue.replace(/,/g, '')))) {
                totalVisitsElement.textContent = currentValue + '+';
            }
        }
    }, 2000);
}

// Counter animation function
function animateCounter(elementId, targetValue, suffix = '', duration = 1000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const increment = targetValue / (duration / 16); // 60fps
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
            element.textContent = Math.floor(currentValue) + suffix;
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// Update news date
function updateNewsDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// 3D Carousel functionality
let currentSlide = 0;
let slideInterval;
const slides = [
    "https://blogger.googleusercontent.com/img/a/AVvXsEgnFAm3R_lG6USF7JA83Zh6J1lhOruxA9UuggmHeMZueaN-HlY0PmZobkDTddr20-ADoXgiw1a5t2rPNdrsz8TMqXDmLkv_blqm96L7yVgEnoF6vq3skLqyJX3ymxGlCCua85uAm9vknrsdMQUKVZ4_MvnpBavqYLIBE9-4TSvVzdVo4-TelzqlGvhdpxk=s16000",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeIdBW9z_uIc3eGGHBi4dPFri7b9udnfzLWoTuBEMnENaJH6wdex8l6vggFjs_hmELwKElqC3QQ_dvK_KF9UdjauNahzftwNobPakX84tO66m4kRWSGsQk7V0rZ_6iLbX0UlkgiI-VkfOzPJ0McnYGSFXPQqBKrsi0FxWWodtFDlUep8XR_EyRngo-EgU/s16000/tojima.jpg",
    "https://blogger.googleusercontent.com/img/a/AVvXsEik-Tiw0bqYjFP0mbesLHsSh5GmsYjR1ZMgAhUcDu-PLks0kAu7PRzPByoPSKj1WTIITXD_d0xAssl9JRKi0CMg0J1YG3jZUPEi_zHUQwqJXjyTN3uYE106W5pzRaiSIpCdQ73FcFRiwlxyQEWinhn3ISl4GyOBqsy-RP7KygEyKqLlOInp9XGjKc7J6EM=s16000",
    "https://lh3.google.com/u/0/d/1uvOzTlDevl7zChewcLWS3pUFedTqUyrO=s16000"
];

function initPosterSlider() {
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (carouselSlides.length === 0) return;
    
    // Add click handlers to slides
    carouselSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (!slide.classList.contains('center')) {
                if (slide.classList.contains('right')) {
                    nextSlide();
                } else if (slide.classList.contains('left')) {
                    prevSlide();
                }
                resetAutoSlide();
            }
        });
    });
    
    // Add arrow button handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
            resetAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
            resetAutoSlide();
        });
    }
    
    // Start auto-sliding
    startAutoSlide();
    
    // Pause on hover
    const carouselSlider = document.querySelector('.carousel-slider');
    if (carouselSlider) {
        carouselSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carouselSlider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
}

function updateCarousel(direction = 'next') {
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    // Add sliding animation based on direction
    carouselSlides.forEach(slide => {
        if (direction === 'next') {
            slide.classList.add('slide-left');
        } else {
            slide.classList.add('slide-right');
        }
    });
    
    // Update images and positions during slide
    setTimeout(() => {
        const leftIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        const centerIndex = currentSlide;
        const rightIndex = (currentSlide + 1) % totalSlides;
        const hiddenIndex = (currentSlide + 2) % totalSlides;
        
        carouselSlides.forEach((slide, index) => {
            // Remove all classes
            slide.classList.remove('left', 'center', 'right', 'hidden', 'active', 'slide-left', 'slide-right');
            
            // Update images
            const img = slide.querySelector('img');
            
            if (index === 0) {
                slide.classList.add('left');
                img.src = slides[leftIndex];
            } else if (index === 1) {
                slide.classList.add('center', 'active');
                img.src = slides[centerIndex];
            } else if (index === 2) {
                slide.classList.add('right');
                img.src = slides[rightIndex];
            } else {
                slide.classList.add('hidden');
                img.src = slides[hiddenIndex];
            }
        });
    }, 400);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel('next');
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel('prev');
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 15000); // Change slide every 15 seconds
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}




/* Secret Admin Dashboard Access via Search Box */
(function() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkSecretPassword(this.value);
            }
        });
        
        // Also check on search button click
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                checkSecretPassword(searchInput.value);
            });
        }
    }
    
    async function checkSecretPassword(input) {
        // Check if input matches admin password
        if (window.AuthHash && input) {
            const isValid = await window.AuthHash.verifyPassword(input);
            if (isValid) {
                // Set session and redirect to admin dashboard
                window.AuthHash.setSession();
                window.location.href = 'admin-dashboard.html';
                return;
            }
        }
        
        // If not password, continue with normal search
        // (existing search functionality will handle it)
    }
})();
