// Load detailed movie data from central manager
let detailedMovieData = {};

// Legacy data structure (will be replaced by postsManager)
const legacyDetailedMovieData = {
    1: {
        id: 1,
        title: "Zenshu",
        year: "2025",
        season: "Winter",
        rating: "6.8",
        ageRating: "PG-13",
        duration: "23 min",
        totalEpisodes: "12",
        viewCount: "4.2M",
        poster: "https://blogger.googleusercontent.com/img/a/AVvXsEgnFAm3R_lG6USF7JA83Zh6J1lhOruxA9UuggmHeMZueaN-HlY0PmZobkDTddr20-ADoXgiw1a5t2rPNdrsz8TMqXDmLkv_blqm96L7yVgEnoF6vq3skLqyJX3ymxGlCCua85uAm9vknrsdMQUKVZ4_MvnpBavqYLIBE9-4TSvVzdVo4-TelzqlGvhdpxk=s16000",
        backdrop: "https://m.media-amazon.com/images/S/pv-target-images/38fb4aa27144f3bd4ebfa1c7daec3709e0482dae8723a40e0f8b13d1cbe5b8bd.jpg",
        genres: "Fantasy, Isekai, Workplace",
        synopsis: "After graduating from high school, Natsuko Hirose starts her career as an animator. Her talent quickly flourishes, and she makes her debut as a director in no time. Her first anime becomes a massive hit, sparking a social phenomenon and earning her recognition as an up-and-coming genius director. Her next project is set to be a romantic comedy movie themed around first love! However, having never been in love herself, Natsuko struggles to understand the concept of first love, and as a result, she’s unable to create the storyboard, causing the movie production to come to a standstill. One day, she passes out while working on her storyboard and wakes up in the world of her favorite childhood anime movie A Tale of Perishing.",
        studio: "Mappa",
        format: "Season 01",
        premiereDate: "Released on 2025",
        status: "Completed",
        broadcast: "OTT (Crunchyroll)",
        language: "Telugu Dub Available",
        
        // Statistics for Overview tab
        statistics: {
            rating: "6.9",
            likedPercentage: "94%",
            totalViews: "4.2M"
        },

        // Cast members (voice actors)
        

        crew: [
            { 
                name: "Govardiniprakash", 
                role: "Script Writer", 
                avatar: "https://blogger.googleusercontent.com/img/a/AVvXsEgqSAoFrLipdqwCxIPX5XlfrVUdkzLsUgLP2kBrKm0WmYZ4cR24RnY1jVcg_bwtmC_TSHZYaBtBqDQsmy02kDdQAjYv2iC51E__lTKzvMkh9Sj64_wrPot2URldD5C5oCZDdY368nc0punGcbwdXDgaNAGA9cYhwlfTnlFcjNWbFQ7p_Qcz5o4H3yAbsUU=s16000",
                projectImage: "https://i.pinimg.com/736x/a1/45/54/a14554b65d4c6974257e19bcc6242e84.jpg"
            }
        ],

        

        
        platforms: [
            { name: "Crunchyroll", status: "Available", icon: "https://logos-marcas.com/wp-content/uploads/2021/03/Crunchyroll-Logotipo-2012-presente.jpg" }

        ],
        trailers: [
            { 
                title: "Official Trailer", 
                description: "Zenshu Telugu Trailer",
                thumbnail: "https://image.tmdb.org/t/p/original/5CQYgKT7P3uArdazN7GhBCwW0zn.jpg", 
                videoId: "X50zZ73VNPQ" 
            },
            { 
                title: "Trailer 02", 
                description: "Zenshu Telugu Trailer 02",
                thumbnail: "https://www.animeclick.it/immagini/anime/ZENSHU/gallery_original/ZENSHU-677b116095780.jpg", 
                videoId: "77P_4W7vjOc" 
            },
            { 
                title: "Trailer 03", 
                description: "Zenshu Telugu Trailer 03",
                thumbnail: "https://finalweapon.net/wp-content/uploads/2024/03/Zenshu-Anime-Announced-by-MAPPA.jpg", 
                videoId: "IIL0JHhaT0s" 
            }
        ],
        mrp: "Visible" // Options: "Visible" or "None"
    },
    
    2: {
        id: 2,
        title: "DanDaDan",
        year: "2024",
        season: "Fall",
        rating: "8.3",
        ageRating: "PG-18",
        duration: "24 min",
        totalEpisodes: "12",
        viewCount: "2.1M",
        poster: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7xLFElqSEYG5ykrx82TfqmYLjpkVckixcvaNoWpqzO-z-HuIiP1_dYBERLfYEyMU7ZPehuQuj-UWOWHanmA3_ll683gz7_5caehDcvn2VMsGlnO1ED83UYI03zz3G-VCYZlVRigWDq221ls5SW2AVPqkkyqDrd3gQX2n9F5QLMKUFvDUKQ9ca5a0QQfY/s16000/dandadan.jpg",
        backdrop: "https://epicflix.com/img/containers/assets/dandadan.png/9c76cbca39a69c1bacc44e8b22169cdb.png",
        genres: "Action, Adventure, Comedy",
        synopsis: " Zenshu – Season 1 is a supernatural action-fantasy anime that follows a young boy who unknowingly awakens an ancient guardian spirit tied to his bloodline, setting off a chain of mystical events that threaten both the human and spirit worlds. As dark entities rise, Zenshu must learn to control his hidden powers and uncover the secrets of his family’s past, all while protecting his friends and facing the destiny he never asked for. Blending heartfelt emotion, high-octane battles, and striking visuals, the series explores courage, friendship, and the true meaning of power — leaving one haunting question: Was this power ever truly his? ",
        studio: "Science SARU",
        format: "Season 01",
        premiereDate: "Released on 2024",
        status: "Completed",
        broadcast: "OTT (Crunchyroll)",
        language: "Telugu Dub Available",
        
        statistics: {
            rating: "8.3",
            likedPercentage: "85%",
            totalViews: "2.1M"
        },

        cast: [
            {
                actorName: "Sai Sujith",
                characterName: "Okarun",
                actorImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwALrO96FUcdMYrVONs7MYHgDAHXUE-g-6YgKSUx2tSltG_77AcOyuyravuihg1H8fKn86vbmk2CE9Y85GiE2mEwa6V597tH74Aq2kd0eNIEL1Ka9-OMtbhDR6Iq_NQEIUOEwg7IUuSX-0-uw2SmWIZ9x9b1-u6fwsQ0_8U5gDCxfwQ8MXxPKonx4KT6I/s16000/Uncle%20look%20Vandhuducho%20%F0%9F%98%90.jpg",
                characterImage: "https://i.pinimg.com/1200x/89/4c/ff/894cffe0e261788602d578e86b12e532.jpg"
            },
            {
                actorName: "Govardiniprakash",
                characterName: "Momo Ayase",
                actorImage: "https://blogger.googleusercontent.com/img/a/AVvXsEgqSAoFrLipdqwCxIPX5XlfrVUdkzLsUgLP2kBrKm0WmYZ4cR24RnY1jVcg_bwtmC_TSHZYaBtBqDQsmy02kDdQAjYv2iC51E__lTKzvMkh9Sj64_wrPot2URldD5C5oCZDdY368nc0punGcbwdXDgaNAGA9cYhwlfTnlFcjNWbFQ7p_Qcz5o4H3yAbsUU=s16000",
                characterImage: "https://i.pinimg.com/736x/2d/7d/4b/2d7d4b9971a3fb5794ed0cd2391e67eb.jpg"
            },
            // Add more voice artists here for Zenshu Crunchyroll dubs
            // Example format:
            // {
            //     actorName: "Voice Artist Name",
            //     characterName: "Character Name",
            //     actorImage: "URL to voice artist photo",
            //     characterImage: "URL to character image"
            // }
        ],

        crew: [
            { 
                name: "Govardiniprakash", 
                role: "Script Writer", 
                avatar: "https://blogger.googleusercontent.com/img/a/AVvXsEgqSAoFrLipdqwCxIPX5XlfrVUdkzLsUgLP2kBrKm0WmYZ4cR24RnY1jVcg_bwtmC_TSHZYaBtBqDQsmy02kDdQAjYv2iC51E__lTKzvMkh9Sj64_wrPot2URldD5C5oCZDdY368nc0punGcbwdXDgaNAGA9cYhwlfTnlFcjNWbFQ7p_Qcz5o4H3yAbsUU=s16000",
                projectImage: "https://i.pinimg.com/736x/61/da/4b/61da4b8bc214fa53da718e8355af0e85.jpg"
            } 
        ],

        
        
        platforms: [
            { name: "Crunchyroll", status: "Available", icon: "https://logos-marcas.com/wp-content/uploads/2021/03/Crunchyroll-Logotipo-2012-presente.jpg" }
        ],
        trailers: [
            { 
                title: "Official Trailer", 
                description: "Dandadan Trailer",
                thumbnail: "https://epicflix.com/img/containers/assets/dandadan.png/9c76cbca39a69c1bacc44e8b22169cdb.png", 
                videoId: "Jl_L50tDZ7Q" 
            }
        ],
        mrp: "none"
    },
    
    
    
    // 🆕 TO ADD MORE MOVIES:
    // 1. Copy the above template
    // 2. Change the number (4, 5, 6, etc.)
    // 3. Update all the movie details
    // 4. Add comma after the previous movie's closing }
    
};

// Default data for movies without detailed information
const defaultMovieData = {
    title: "Unknown Title",
    year: "TBA",
    rating: "N/A",
    ageRating: "TBA",
    duration: "TBA",
    genres: "Unknown",
    synopsis: "Synopsis not available.",
    studio: "Unknown Studio",
    format: "TV Series",
    premiereDate: "TBA",
    status: "Unknown",
    broadcast: "TBA",
    language: "Japanese",
    cast: [],
    crew: [],
    platforms: [],
    trailers: [],
    mrp: "None", // Default to hidden
    backdrop: "https://image.tmdb.org/t/p/original/5CQYgKT7P3uArdazN7GhBCwW0zn.jpg" // Default backdrop
};

// DOM Elements
const moviePoster = document.getElementById('moviePoster');
const movieTitle = document.getElementById('movieTitle');
const heroGenres = document.getElementById('heroGenres');
const heroDescription = document.getElementById('heroDescription');
const ageRating = document.getElementById('ageRating');
const releaseYear = document.getElementById('releaseYear');
const imdbRating = document.getElementById('imdbRating');
const duration = document.getElementById('duration');
const trailerBtnHero = document.getElementById('trailerBtnHero');
const contentTypeBadge = document.getElementById('contentTypeBadge');
const posterCredit = document.getElementById('posterCredit');

// Overview tab elements
const overviewSynopsis = document.getElementById('overviewSynopsis');
const overviewGenres = document.getElementById('overviewGenres');

// Statistics elements
const statRating = document.getElementById('statRating');
const statLiked = document.getElementById('statLiked');
const statisticsGrid = document.getElementById('statisticsGrid');


// Clean Tab elements
const cleanTabs = document.querySelectorAll('.clean-tab');
const cleanTabContents = document.querySelectorAll('.clean-tab-content');

// Content elements
const castList = document.getElementById('castList');
const crewList = document.getElementById('crewList');
const dubbingStudiosList = document.getElementById('dubbingStudiosList');
const platformsList = document.getElementById('platformsList');
const trailersList = document.getElementById('trailersList');

// Detail elements
const studioName = document.getElementById('studioName');
const formatType = document.getElementById('formatType');
const premiereDate = document.getElementById('premiereDate');
const statusInfo = document.getElementById('statusInfo');
const languageInfo = document.getElementById('languageInfo');

// Modal elements
const trailerModal = document.getElementById('trailerModal');
const trailerPlayer = document.getElementById('trailerPlayer');
const modalTrailerTitle = document.getElementById('modalTrailerTitle');

// Search elements
const searchToggle = document.getElementById('searchToggle');
const mobileSearchOverlay = document.getElementById('mobileSearchOverlay');
const searchCloseBtn = document.getElementById('searchCloseBtn');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const searchSubmitBtn = document.getElementById('searchSubmitBtn');
const searchResults = document.getElementById('searchResults');

// Theme elements - Now handled by theme-manager.js
// const themeToggle = document.getElementById('themeToggle');

// State
let currentMovie = null;

// Telugu Font Management
class TeluguFontManager {
    constructor() {
        this.teluguFonts = [
            'Noto Sans Telugu',
            'Gautami',
            'Latha',
            'Raavi'
        ];
        this.init();
    }
    
    init() {
        this.detectTeluguContent();
        this.optimizeForMobile();
        this.setupFontFallbacks();
    }
    
    // Detect Telugu text content
    detectTeluguContent() {
        const teluguRegex = /[\u0C00-\u0C7F]/;
        const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        
        textElements.forEach(element => {
            if (teluguRegex.test(element.textContent)) {
                element.classList.add('telugu-text');
                
                // Add title class for headings
                if (element.tagName.match(/^H[1-6]$/)) {
                    element.classList.add('telugu-title');
                }
            } else if (this.hasMixedContent(element.textContent)) {
                element.classList.add('mixed-content');
            }
        });
    }
    
    // Check for mixed Telugu and English content
    hasMixedContent(text) {
        const teluguRegex = /[\u0C00-\u0C7F]/;
        const englishRegex = /[a-zA-Z]/;
        return teluguRegex.test(text) && englishRegex.test(text);
    }
    
    // Mobile-specific optimizations
    optimizeForMobile() {
        if (window.innerWidth <= 480) {
            document.body.style.textSizeAdjust = '100%';
            document.body.style.webkitTextSizeAdjust = '100%';
            
            // Improve Telugu text rendering on mobile
            const teluguElements = document.querySelectorAll('.telugu-text, .telugu-title');
            teluguElements.forEach(element => {
                element.style.webkitFontSmoothing = 'antialiased';
                element.style.mozOsxFontSmoothing = 'grayscale';
            });
        }
    }
    
    // Setup font loading and fallbacks
    setupFontFallbacks() {
        // Check if Telugu fonts are loaded
        if (document.fonts) {
            document.fonts.ready.then(() => {
                this.verifyTeluguFonts();
            });
        }
    }
    
    // Verify Telugu font availability
    verifyTeluguFonts() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Test Telugu character rendering
        const teluguChar = 'అ'; // Telugu letter A
        
        this.teluguFonts.forEach(font => {
            context.font = `16px "${font}"`;
            const width = context.measureText(teluguChar).width;
            
            if (width > 0) {
                console.log(`Telugu font "${font}" is available`);
            }
        });
    }
    
    // Add Telugu content dynamically
    addTeluguContent(element, teluguText, englishText = '') {
        element.innerHTML = `
            <span class="telugu-text">${teluguText}</span>
            ${englishText ? `<span class="english-text">${englishText}</span>` : ''}
        `;
    }
    
    // Update existing content with Telugu support
    updateContentWithTelugu() {
        // Example: Update movie title with Telugu
        const movieTitle = document.getElementById('movieTitle');
        if (movieTitle) {
            const englishTitle = movieTitle.textContent;
            // You can add Telugu translations here
            const teluguTitles = {
                'The Martian': 'ది మార్టియన్',
                'Demon Slayer': 'డెమన్ స్లేయర్',
                'My Hero Academia': 'మై హీరో అకాడెమియా'
            };
            
            if (teluguTitles[englishTitle]) {
                this.addTeluguContent(movieTitle, teluguTitles[englishTitle], ` (${englishTitle})`);
            }
        }
        
        // Update other elements as needed
        this.updateGenresWithTelugu();
        this.updateDescriptionWithTelugu();
    }
    
    // Update genres with Telugu translations
    updateGenresWithTelugu() {
        const genreElements = document.querySelectorAll('.genre-tag');
        const genreTranslations = {
            'Action': 'యాక్షన్',
            'Adventure': 'అడ్వెంచర్',
            'Drama': 'డ్రామా',
            'Comedy': 'కామెడీ',
            'Romance': 'రొమాన్స్',
            'Thriller': 'థ్రిల్లర్',
            'Horror': 'హార్రర్',
            'Fantasy': 'ఫాంటసీ',
            'Science Fiction': 'సైన్స్ ఫిక్షన్'
        };
        
        genreElements.forEach(element => {
            const englishGenre = element.textContent.trim();
            if (genreTranslations[englishGenre]) {
                this.addTeluguContent(element, genreTranslations[englishGenre], ` (${englishGenre})`);
            }
        });
    }
    
    // Update description with Telugu support
    updateDescriptionWithTelugu() {
        const description = document.getElementById('heroDescription');
        if (description && description.textContent.includes('Telugu')) {
            description.classList.add('mixed-content');
        }
    }
}

// Initialize Telugu Font Manager
let teluguFontManager;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load posts from central manager
    if (window.postsManager) {
        const allPosts = window.postsManager.getAllPosts();
        detailedMovieData = {};
        allPosts.forEach(post => {
            detailedMovieData[post.id] = post;
        });
    }
    
    const movieId = getMovieIdFromURL() || '1';
    loadMovieData(movieId);
    
    // Initialize Telugu font management after content is loaded
    setTimeout(() => {
        teluguFontManager = new TeluguFontManager();
        teluguFontManager.updateContentWithTelugu();
    }, 500);
    setupEventListeners();
    // initializeTheme(); - Now handled by theme-manager.js
});

function getMovieIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || localStorage.getItem('selectedMovieId');
}

function loadMovieData(movieId) {
    currentMovie = detailedMovieData[movieId] || { ...defaultMovieData, id: movieId };
    
    // Set backdrop image dynamically
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const backdropUrl = currentMovie.backdrop || defaultMovieData.backdrop;
        heroSection.style.setProperty('--backdrop-image', `url('${backdropUrl}')`);
        console.log('Backdrop set to:', backdropUrl);
    }
    
    // Set poster
    moviePoster.src = currentMovie.poster;
    moviePoster.alt = currentMovie.title;
    
    // Set basic info
    movieTitle.textContent = currentMovie.title;
    heroGenres.textContent = currentMovie.genres;
    
    // Set content type badge
    if (contentTypeBadge) {
        contentTypeBadge.textContent = currentMovie.format === 'Feature Film' ? 'MOVIE' : 'SERIES';
    }
    
    // Set description with read more functionality
    const shortDescription = currentMovie.synopsis.substring(0, 200) + '...';
    heroDescription.innerHTML = `${shortDescription} <span class="read-more">read more</span>`;
    
    // Update Overview tab synopsis
    const overviewSynopsis = document.getElementById('overviewSynopsis');
    if (overviewSynopsis) {
        overviewSynopsis.textContent = currentMovie.synopsis;
    }
    
    // Update Overview tab genres
    const overviewGenres = document.getElementById('overviewGenres');
    if (overviewGenres && currentMovie.genres) {
        const genreArray = currentMovie.genres.split(', ');
        overviewGenres.innerHTML = genreArray.map(genre => 
            `<span class="genre-tag">${genre.trim()}</span>`
        ).join('');
    }
    
    // Update Statistics
    if (currentMovie.statistics) {
        if (statRating) {
            statRating.textContent = currentMovie.statistics.rating;
        }
        if (statLiked) {
            statLiked.textContent = currentMovie.statistics.likedPercentage;
        }
    }
    
    // Set meta information
    ageRating.textContent = currentMovie.ageRating;
    releaseYear.textContent = currentMovie.year;
    imdbRating.innerHTML = `<i class="fas fa-star"></i> ${currentMovie.rating}`;
    duration.innerHTML = `<i class="fas fa-clock"></i> ${currentMovie.duration}`;
    
    // Update runtime in Overview tab
    const episodeCount = document.getElementById('episodeCount');
    if (episodeCount) {
        episodeCount.textContent = currentMovie.duration;
    }
    
    // Load tab content
    loadDetails();
    loadCast();
    loadCrew();
    loadDubbingStudios();
    loadPlatforms();
    loadTrailers();
    
    // Update poster credit visibility
    updatePosterCredit();
    
    // Update Mobile Overlay Content
    updateMobileOverlayContent();
    
    // Update Mobile Popup Content
    updateMobilePopupContent();

}

function loadDetails() {
    if (studioName) studioName.textContent = currentMovie.studio;
    if (formatType) formatType.textContent = currentMovie.format;
    if (premiereDate) premiereDate.textContent = currentMovie.premiereDate;
    if (statusInfo) statusInfo.textContent = currentMovie.status;
    if (languageInfo) languageInfo.textContent = currentMovie.language;
    
    // Handle Total Episodes box
    const totalEpisodesBox = document.getElementById('totalEpisodesBox');
    const totalEpisodesValue = document.getElementById('totalEpisodesValue');
    
    if (totalEpisodesBox && totalEpisodesValue) {
        if (currentMovie.totalEpisodes && currentMovie.totalEpisodes.toLowerCase() !== 'none') {
            totalEpisodesValue.textContent = currentMovie.totalEpisodes;
            totalEpisodesBox.style.display = 'flex';
        } else {
            totalEpisodesBox.style.display = 'none';
        }
    }
}

function loadCast() {
    if (!castList) return;
    
    castList.innerHTML = '';
    if (currentMovie.cast && currentMovie.cast.length > 0) {
        currentMovie.cast.forEach(member => {
            const castElement = createCastElement(member);
            castList.appendChild(castElement);
        });
    } else {
        castList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px; grid-column: 1 / -1;">Cast information not available</p>';
    }
}

function createCastElement(member) {
    const castDiv = document.createElement('div');
    castDiv.className = 'cast-member';
    
    castDiv.innerHTML = `
        <div class="cast-left">
            <img src="${member.actorImage}" alt="${member.actorName}" class="cast-avatar" onerror="this.style.display='none'">
            <div class="cast-info">
                <div class="cast-name">${member.actorName}</div>
                <div class="cast-role">Voice Artist</div>
            </div>
        </div>
        <div class="cast-right">
            <div class="character-info">
                <div class="character-name">${member.characterName}</div>
                <div class="character-dub">${currentMovie.title}</div>
            </div>
            <img src="${member.characterImage}" alt="${member.characterName}" class="character-avatar" onerror="this.style.display='none'">
        </div>
    `;
    
    return castDiv;
}

function loadCrew() {
    if (!crewList) return;
    
    crewList.innerHTML = '';
    crewList.className = 'cast-grid'; // Use same class as cast for consistent styling
    
    if (currentMovie.crew && currentMovie.crew.length > 0) {
        currentMovie.crew.forEach(member => {
            const crewElement = createCrewElement(member);
            crewList.appendChild(crewElement);
        });
    } else {
        crewList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px; grid-column: 1 / -1;">Production crew information not available</p>';
    }
}

function createCrewElement(member) {
    const crewDiv = document.createElement('div');
    crewDiv.className = 'cast-member crew-member-type'; // Add crew-specific class
    
    // Get department logo from voice artist sync or determine from role
    const departmentLogo = member.departmentLogo || getDepartmentLogoFromRole(member.role);
    const animeTitle = member.animeTitle || currentMovie.title || 'Zenshu';
    
    crewDiv.innerHTML = `
        <div class="cast-left">
            <img src="${member.avatar}" alt="${member.name}" class="cast-avatar" onerror="this.style.display='none'">
            <div class="cast-info">
                <div class="cast-name">${member.name}</div>
                <div class="cast-role">${member.role}</div>
            </div>
        </div>
        <div class="cast-right">
            <div class="character-info">
                <div class="character-name">${animeTitle}</div>
            </div>
            <div class="anime-image-container">
                <img src="${member.projectImage || currentMovie.poster}" alt="${animeTitle}" class="character-avatar">
            </div>
        </div>
    `;
    
    return crewDiv;
}

// Helper function to get department logo from role
function getDepartmentLogoFromRole(role) {
    if (role.includes('Writer')) return 'fas fa-pen';
    if (role.includes('Director')) return 'fas fa-video';
    if (role.includes('Sound') || role.includes('Audio')) return 'fas fa-volume-up';
    if (role.includes('Music')) return 'fas fa-music';
    if (role.includes('Producer')) return 'fas fa-film';
    if (role.includes('Editor')) return 'fas fa-cut';
    return 'fas fa-cogs'; // Default production icon
}

function loadDubbingStudios() {
    if (!dubbingStudiosList) return;
    
    dubbingStudiosList.innerHTML = '';
    dubbingStudiosList.className = 'cast-grid'; // Use same class as cast for consistent styling
    
    if (currentMovie.dubbingStudios && currentMovie.dubbingStudios.length > 0) {
        currentMovie.dubbingStudios.forEach(studio => {
            const studioElement = createDubbingStudioElement(studio);
            dubbingStudiosList.appendChild(studioElement);
        });
    } else {
        dubbingStudiosList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px; grid-column: 1 / -1;">Dubbing studios information not available</p>';
    }
}

function createDubbingStudioElement(studio) {
    const studioDiv = document.createElement('div');
    studioDiv.className = 'cast-member studio-member-type'; // Add studio-specific class
    
    studioDiv.innerHTML = `
        <div class="cast-left">
            <img src="${studio.avatar}" alt="${studio.name}" class="cast-avatar" onerror="this.style.display='none'">
            <div class="cast-info">
                <div class="cast-name">${studio.name}</div>
                <div class="cast-role">${studio.role}${studio.location ? ` • ${studio.location}` : ''}</div>
            </div>
        </div>
        <div class="cast-right">
            <div class="character-info">
                <div class="character-name">Zenshu</div>
            </div>
            <div class="anime-image-container">
                <img src="${studio.projectImage || currentMovie.poster}" alt="Zenshu" class="character-avatar">
            </div>
        </div>
    `;
    
    return studioDiv;
}

function loadPlatforms() {
    if (!platformsList) return;
    
    platformsList.innerHTML = '';
    if (currentMovie.platforms && currentMovie.platforms.length > 0) {
        currentMovie.platforms.forEach(platform => {
            const platformElement = createPlatformElement(platform);
            platformsList.appendChild(platformElement);
        });
    } else {
        platformsList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Platform information not available</p>';
    }
}

function createPlatformElement(platform) {
    const platformLink = document.createElement('a');
    platformLink.href = platform.url || '#';
    platformLink.target = '_blank';
    platformLink.rel = 'noopener noreferrer';
    platformLink.className = 'platform-link';
    
    platformLink.innerHTML = `
        <div class="platform-card">
            <div class="platform-logo">
                <img src="${platform.logo || platform.icon || ''}" alt="${platform.name}" onerror="this.style.display='none'">
            </div>
            <div class="platform-info">
                <h4 class="platform-name">${platform.name}</h4>
                <p class="platform-description">${platform.status || 'Available'}</p>
            </div>
            <div class="platform-arrow">
                <i class="fas fa-external-link-alt"></i>
            </div>
        </div>
    `;
    
    return platformLink;
}

function loadTrailers() {
    if (!trailersList) return;
    
    trailersList.innerHTML = '';
    if (currentMovie.trailers && currentMovie.trailers.length > 0) {
        currentMovie.trailers.forEach(trailer => {
            const trailerElement = createTrailerElement(trailer);
            trailersList.appendChild(trailerElement);
        });
    } else {
        trailersList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No trailers available</p>';
    }
}

function createTrailerElement(trailer) {
    const trailerDiv = document.createElement('div');
    trailerDiv.className = 'trailer-item';
    trailerDiv.onclick = () => openTrailer(trailer.videoId, trailer.title);
    
    trailerDiv.innerHTML = `
        <div class="trailer-thumbnail">
            <img src="${trailer.thumbnail}" alt="${trailer.title}" onerror="this.style.display='none'">
            <div class="play-overlay">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="trailer-info">
            <div class="trailer-title">${trailer.title}</div>
            <div class="trailer-description">${trailer.description}</div>
        </div>
    `;
    
    return trailerDiv;
}

function setupEventListeners() {
    // Clean tab switching
    cleanTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchCleanTab(tabId);
        });
    });
    
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Hero trailer button
    if (trailerBtnHero) {
        trailerBtnHero.addEventListener('click', () => {
            if (currentMovie.trailers && currentMovie.trailers.length > 0) {
                openTrailer(currentMovie.trailers[0].videoId, currentMovie.trailers[0].title);
            }
        });
    }
    

    
    // Read more functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-more')) {
            toggleDescription();
        }
    });
    
    // Modal close events
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeTrailerModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTrailerModal();
            closeMobileSearch();
        }
    });
    
    // Search functionality
    if (searchToggle) {
        searchToggle.addEventListener('click', openMobileSearch);
    }
    
    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', closeMobileSearch);
    }
    
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', handleSearchInput);
        mobileSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', performSearch);
    }
    
    // Theme toggle - Now handled by theme-manager.js
    // if (themeToggle) {
    //     themeToggle.addEventListener('click', toggleTheme);
    // }
    
    // Window resize listener for backdrop image
    window.addEventListener('resize', () => {
        updateBackdropForScreenSize();
    });
}

function switchCleanTab(tabId) {
    // Remove active class from all tabs and contents
    cleanTabs.forEach(btn => btn.classList.remove('active'));
    cleanTabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function toggleDescription() {
    const isExpanded = heroDescription.classList.contains('expanded');
    
    if (isExpanded) {
        const shortDescription = currentMovie.synopsis.substring(0, 200) + '...';
        heroDescription.innerHTML = `${shortDescription} <span class="read-more">read more</span>`;
        heroDescription.classList.remove('expanded');
    } else {
        heroDescription.innerHTML = `${currentMovie.synopsis} <span class="read-more">read less</span>`;
        heroDescription.classList.add('expanded');
    }
}

function openTrailer(videoId, title = 'Trailer') {
    if (!videoId) return;
    
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    trailerPlayer.src = embedUrl;
    modalTrailerTitle.textContent = title;
    trailerModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeTrailerModal() {
    trailerModal.style.display = 'none';
    trailerPlayer.src = '';
    document.body.style.overflow = 'auto';
}

// Search functionality
function openMobileSearch() {
    if (mobileSearchOverlay) {
        mobileSearchOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            if (mobileSearchInput) mobileSearchInput.focus();
        }, 300);
    }
}

function closeMobileSearch() {
    if (mobileSearchOverlay) {
        mobileSearchOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (mobileSearchInput) mobileSearchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
    }
}

function handleSearchInput() {
    const query = mobileSearchInput.value.trim();
    if (query.length > 2) {
        performSearch();
    } else if (query.length === 0) {
        searchResults.innerHTML = '';
    }
}

function performSearch() {
    const query = mobileSearchInput.value.trim().toLowerCase();
    if (!query) return;
    
    // Search through available movies
    const results = Object.values(detailedMovieData).filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.genres.toLowerCase().includes(query) ||
        movie.studio.toLowerCase().includes(query)
    );
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                <p>No results found</p>
            </div>
        `;
        return;
    }
    
    results.forEach(movie => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.onclick = () => {
            localStorage.setItem('selectedMovieId', movie.id);
            window.location.href = `post.html?id=${movie.id}`;
        };
        
        resultItem.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="search-result-poster" onerror="this.style.display='none'">
            <div class="search-result-info">
                <h4>${movie.title}</h4>
                <p>${movie.genres} • ${movie.year}</p>
            </div>
        `;
        
        searchResults.appendChild(resultItem);
    });
}

// Theme System Functions - Now handled by theme-manager.js
function initializeTheme() {
    // Theme is now handled by theme-manager.js
    // This function is kept for compatibility but does nothing
}

function toggleTheme() {
    // Theme toggle is now handled by theme-manager.js
    // This function is kept for compatibility but does nothing
}

function updateThemeIcon(theme) {
    // Theme icon update is now handled by theme-manager.js
    // This function is kept for compatibility but does nothing
}



// Backdrop Image Update Function (now same for all screen sizes)
function updateBackdropForScreenSize() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && currentMovie) {
        const backdropUrl = currentMovie.backdrop || defaultMovieData.backdrop;
        heroSection.style.setProperty('--backdrop-image', `url('${backdropUrl}')`);
        console.log('Backdrop updated - same format for all screen sizes:', backdropUrl);
    }
}

// Poster Credit Functionality
function updatePosterCredit() {
    if (!posterCredit || !currentMovie) return;
    
    if (currentMovie.mrp === "Visible") {
        posterCredit.classList.add('visible');
    } else {
        posterCredit.classList.remove('visible');
    }
}

// Mobile Overlay Content Update
function updateMobileOverlayContent() {
    if (!currentMovie) return;
    
    const overlayTitle = document.getElementById('overlayMovieTitle');
    const overlayAgeRating = document.getElementById('overlayAgeRating');
    const overlayYear = document.getElementById('overlayYear');
    const overlayDuration = document.getElementById('overlayDuration');
    const overlayGenre = document.getElementById('overlayGenre');
    
    if (overlayTitle) overlayTitle.textContent = currentMovie.title;
    if (overlayAgeRating) overlayAgeRating.textContent = currentMovie.ageRating;
    if (overlayYear) overlayYear.textContent = currentMovie.year;
    if (overlayDuration) overlayDuration.textContent = currentMovie.duration;
    if (overlayGenre && currentMovie.genres) {
        const firstGenre = currentMovie.genres.split(', ')[0];
        overlayGenre.textContent = firstGenre;
    }
}

// Mobile Popup Content Update
function updateMobilePopupContent() {
    if (!currentMovie) return;
    
    const popupRating = document.getElementById('popupRating');
    const popupTmdbRating = document.getElementById('popupTmdbRating');
    const popupViews = document.getElementById('popupViews');
    const popupDescription = document.getElementById('popupDescription');
    const streamNowBtn = document.getElementById('streamNowBtn');
    const trailerBtn = document.getElementById('trailerBtn');
    
    // Update IMDb rating from statistics
    if (popupRating && currentMovie.statistics) {
        popupRating.textContent = currentMovie.statistics.rating;
    }
    
    // Update TMDB rating from statistics (use likedPercentage)
    if (popupTmdbRating && currentMovie.statistics) {
        popupTmdbRating.textContent = currentMovie.statistics.likedPercentage;
    }
    
    // Update view count
    if (popupViews) {
        popupViews.textContent = 'Total Ratings';
    }
    
    // Update description
    if (popupDescription) {
        const shortDesc = currentMovie.synopsis.substring(0, 150) + '...';
        popupDescription.textContent = shortDesc;
    }
    
    // Add stream button functionality
    if (streamNowBtn) {
        streamNowBtn.addEventListener('click', () => {
            if (currentMovie.trailers && currentMovie.trailers.length > 0) {
                openTrailer(currentMovie.trailers[0].videoId, currentMovie.trailers[0].title);
            }
        });
    }
    
    // Add trailer button functionality (new YouTube trailer button)
    if (trailerBtn) {
        trailerBtn.addEventListener('click', () => {
            if (currentMovie.trailers && currentMovie.trailers.length > 0) {
                openTrailer(currentMovie.trailers[0].videoId, currentMovie.trailers[0].title);
            }
        });
    }
}

// Export for global access
window.openTrailer = openTrailer;
window.closeTrailerModal = closeTrailerModal;
window.openMobileSearch = openMobileSearch;
window.closeMobileSearch = closeMobileSearch;
window.toggleTheme = toggleTheme;
window.updatePosterCredit = updatePosterCredit;
