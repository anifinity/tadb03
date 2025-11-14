/* IMDb Ratings Display - Synced from Posts */

/* DOM Elements */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');

/* Pagination Variables */
let allRatedPosts = [];
let filteredPosts = [];
let currentPage = 1;
const postsPerPage = 20;
let isSearching = false;

/* Initialize */
document.addEventListener('DOMContentLoaded', function() {
    loadRatings();
    setupEventListeners();
    setupSearchListeners();
});

/* Load Ratings from Posts */
function loadRatings() {
    const container = document.getElementById('ratingsList');
    
    if (!window.postsManager) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>Posts manager not loaded</p></div>';
        return;
    }
    
    // Get all posts
    const posts = window.postsManager.getAllPosts();
    
    // Filter posts with IMDb ratings
    allRatedPosts = posts.filter(post => post.rating && parseFloat(post.rating) > 0);
    
    if (allRatedPosts.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-star"></i><p>No IMDb ratings found. Add ratings in post editor to see them here.</p></div>';
        return;
    }
    
    // Sort by rating (highest first)
    allRatedPosts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    
    // Update header count
    updateHeaderCount(allRatedPosts.length);
    
    // Display first page
    displayPage(1);
}

/* Display Specific Page */
function displayPage(page) {
    currentPage = page;
    const container = document.getElementById('ratingsList');
    
    // Use filtered posts if searching, otherwise use all posts
    const postsToDisplay = isSearching ? filteredPosts : allRatedPosts;
    
    // Calculate start and end indices
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    
    // Get posts for current page
    const pagePosts = postsToDisplay.slice(startIndex, endIndex);
    
    // Render cards
    container.innerHTML = '';
    if (pagePosts.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>No anime found matching your search.</p></div>';
    } else {
        pagePosts.forEach((post, index) => {
            const globalRank = startIndex + index + 1;
            const card = createRatingCard(post, globalRank);
            container.appendChild(card);
        });
    }
    
    // Update pagination
    renderPagination();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Render Pagination */
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    
    // Use filtered posts if searching, otherwise use all posts
    const postsToDisplay = isSearching ? filteredPosts : allRatedPosts;
    
    if (!paginationContainer || postsToDisplay.length <= postsPerPage) {
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    const totalPages = Math.ceil(postsToDisplay.length / postsPerPage);
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="page-btn" onclick="displayPage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" 
                onclick="displayPage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="page-dots">...</span>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="page-btn" onclick="displayPage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>`;
    }
    
    paginationContainer.innerHTML = paginationHTML;
}

/* Create Rating Card */
function createRatingCard(post, rank) {
    const card = document.createElement('div');
    card.classList.add('ranking-item');
    card.style.backgroundImage = `url('${post.backdrop || post.poster}')`;
    card.onclick = () => window.location.href = `post.html?id=${post.id}`;
    
    card.innerHTML = `
        <div class="rank-number">${String(rank).padStart(2, '0')}</div>
        <div class="anime-title-section">
            <h3 class="anime-title">${post.title.toUpperCase()}</h3>
        </div>
        <div class="imdb-rating-box">
            <div class="rating-text">${parseFloat(post.rating).toFixed(1)}/10</div>
            <div class="imdb-logo">IMDb</div>
        </div>
    `;
    
    return card;
}

/* Update Header Count */
function updateHeaderCount(count) {
    const subtitle = document.getElementById('subtitleText');
    if (subtitle) {
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
        subtitle.textContent = `TOP ${String(count).padStart(2, '0')} LIST TILL ${dateStr}`;
    }
}

/* Event Listeners */
function setupEventListeners() {
    // Menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    // Search toggle
    if (searchToggle) {
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSearchBox();
        });
    }
    
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
}

/* Mobile Menu Functions */
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
}

function closeMobileMenu() {
    mobileMenu.classList.remove('show');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

/* Search Box Functions */
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
        if (searchInput) searchInput.focus();
    }, 200);
}

function closeSearchBox() {
    searchBox.classList.remove('show');
    searchToggle.innerHTML = '<i class="fas fa-search"></i>';
}

/* Search Functionality */
function setupSearchListeners() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        // Search on input
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(e.target.value);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (searchInput) {
                performSearch(searchInput.value);
            }
        });
    }
}

function performSearch(query) {
    const searchQuery = query.trim().toLowerCase();
    
    if (searchQuery === '') {
        // Reset to show all posts
        isSearching = false;
        filteredPosts = [];
        currentPage = 1;
        displayPage(1);
        return;
    }
    
    // Filter posts by title
    isSearching = true;
    filteredPosts = allRatedPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery)
    );
    
    // Reset to first page and display results
    currentPage = 1;
    displayPage(1);
}
