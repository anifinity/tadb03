/* ----------------- ANIME DATA ----------------- */
// All data now comes from schedule editor - no hardcoded data
const upcomingAnime = [];
const tvSchedule = [];
const weeklyEpisodes = [];

// Load schedules from schedule-manager (localStorage)
function loadEditorSchedules() {
    if (!window.scheduleManager) return;
    
    // Get all schedules from editor
    const allSchedules = window.scheduleManager.getAllSchedules();
    
    allSchedules.forEach(show => {
        // Check if it's a movie
        const isMovie = show.type === 'Movie' || show.category === 'movies';
        
        // Parse day and time to create proper date
        const dayMap = {
            'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4,
            'Friday': 5, 'Saturday': 6, 'Sunday': 0
        };
        
        const today = new Date();
        const targetDay = dayMap[show.day];
        
        if (targetDay === undefined) {
            console.warn(`Invalid day for ${show.title}: ${show.day}`);
            return;
        }
        
        // Calculate days until next occurrence of target day
        let daysUntil = (targetDay - today.getDay() + 7) % 7;
        
        // If it's today but time hasn't passed yet, keep it as 0
        // If time has passed, schedule for next week
        if (daysUntil === 0) {
            const timeParts = show.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
            if (timeParts) {
                let hours = parseInt(timeParts[1]);
                const minutes = parseInt(timeParts[2]);
                const period = timeParts[3].toUpperCase();
                
                if (period === 'PM' && hours !== 12) hours += 12;
                if (period === 'AM' && hours === 12) hours = 0;
                
                const targetTime = new Date(today);
                targetTime.setHours(hours, minutes, 0, 0);
                
                if (today > targetTime) {
                    daysUntil = 7; // Next week
                }
            }
        }
        
        // If daysUntil is still 0, it means today is the day and time hasn't passed
        // So we should show today's date
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + daysUntil);
        
        // Parse time (e.g., "6:00 PM")
        const timeParts = show.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (timeParts) {
            let hours = parseInt(timeParts[1]);
            const minutes = parseInt(timeParts[2]);
            const period = timeParts[3].toUpperCase();
            
            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
            
            nextDate.setHours(hours, minutes, 0, 0);
        }
        
        // Get category
        const category = show.category || 'weekly';
        
        // Parse episode info from editor (e.g., "Episode 12" -> 12)
        let currentEp = 0;
        let totalEp = 12;
        
        if (show.episode) {
            const epMatch = show.episode.match(/(\d+)/);
            if (epMatch) {
                currentEp = parseInt(epMatch[1]);
            }
        }
        
        const scheduleItem = {
            title: show.title,
            platform: show.platform,
            language: "Telugu",
            type: isMovie ? "Movie" : "Series",
            startDate: nextDate.toISOString(),
            intervalDays: category === 'tv' ? 1 : 7,
            totalEpisodes: totalEp,
            currentEpisode: currentEp,
            image: show.poster,
            episode: show.episode || (isMovie ? "Movie" : "Episode 1"),
            day: show.day,
            time: show.time,
            isMovie: isMovie,
            isFromEditor: true,
            useEditorData: true // Flag to use editor data directly
        };
        
        // Add to appropriate category
        if (category === 'upcoming') {
            upcomingAnime.push({
                title: show.title,
                platform: show.platform,
                language: "Telugu",
                type: isMovie ? "Movie" : "Series",
                releaseDate: show.releaseDate || nextDate.toISOString(),
                image: show.poster,
                editorDay: show.day,
                editorTime: show.time
            });
        } else if (category === 'tv' || category === 'movies') {
            tvSchedule.push(scheduleItem);
        } else {
            // Default to weekly
            weeklyEpisodes.push(scheduleItem);
        }
    });
}

// All hardcoded data removed - only editor data will be shown

/* ----------------- DOM ELEMENTS ----------------- */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const themeToggle = document.getElementById('themeToggle');

/* ----------------- INITIALIZATION ----------------- */
document.addEventListener('DOMContentLoaded', function () {
    // Load editor schedules first
    loadEditorSchedules();
    
    setupEventListeners();
    setupScrollEffects();
    initTabSwitching();
    
    // Theme is now handled by theme-manager.js
    // const themeOverride = localStorage.getItem('themeOverride');
    // let theme;

    // if (themeOverride === 'true') {
    //     theme = localStorage.getItem('theme') || 'default';
    // } else {
    //     theme = getSystemTheme();
    // }

    // document.documentElement.setAttribute('data-theme', theme);
    // document.querySelector('.schedule-wrapper').setAttribute('data-theme', theme);

    renderUpcoming();
    renderWeekly();
    renderTvSchedule();
    updateCountdown();
    updateTabCounts();
    initTVUpdates();
});

/* ----------------- THEME MANAGEMENT ----------------- */
// Theme management is now handled by theme-manager.js

function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'default';
}

/* ----------------- RENDERING FUNCTIONS ----------------- */
function renderUpcoming() {
    const container = document.getElementById('upcoming-container');
    container.innerHTML = '';

    upcomingAnime.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('schedule-card');
        const releaseDate = new Date(anime.releaseDate);

        const dateStr = releaseDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        const timeStr = releaseDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // Use editor's original day/time if available
        const displayDate = anime.editorDay ? anime.editorDay.toUpperCase().substring(0, 3) + ', ' + dateStr.split(', ')[1] : dateStr;
        const displayTime = anime.editorTime || timeStr;
        
        card.innerHTML = `
            <div class="card-top">
                <img src="${anime.image}" alt="${anime.title}">
                <div class="schedule-details">
                    <h3>${anime.title}</h3>
                    <div class="tags">
                        <span class="tag ${anime.platform}">${anime.platform}</span>
                        <span class="tag ${anime.language}">${anime.language}</span>
                        <span class="tag ${anime.type}">${anime.type}</span>
                    </div>
                    <div class="episode-date-time">
                        <span class="date-badge">📅 ${displayDate}</span>
                        <span class="time-badge">🕒 ${displayTime}</span>
                        <span class="status-badge">🔜 UPCOMING</span>
                    </div>
                    <div class="release-time">Premiere Date</div>
                    <div class="countdown" data-date="${anime.releaseDate}"></div>
                    <div class="btn-row">
                        <button class="btn" onclick="setReminder('${anime.title}','${anime.releaseDate}')">Set Reminder</button>
                    </div>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

function renderTvSchedule() {
    const container = document.getElementById('tv-container');
    container.innerHTML = '';
    const now = new Date();

    tvSchedule.forEach(show => {
        const start = new Date(show.startDate);
        const isMovie = show.isMovie || show.type === 'Movie';
        
        // For movies, don't calculate episodes - just show the release date
        let currentEpisode, nextEpNum, nextDate;
        
        if (isMovie) {
            // Movie logic - just show the scheduled date
            currentEpisode = 0;
            nextEpNum = null;
            nextDate = start > now ? start : null;
        } else if (show.useEditorData) {
            // Use editor data directly
            currentEpisode = show.currentEpisode;
            nextEpNum = currentEpisode < show.totalEpisodes ? currentEpisode + 1 : null;
            nextDate = nextEpNum ? start : null;
        } else {
            // Series logic - calculate episodes for hardcoded data
            const daysPassed = Math.floor((now - start) / (1000 * 60 * 60 * 24 * show.intervalDays));
            currentEpisode = show.currentEpisode + daysPassed;
            if (currentEpisode > show.totalEpisodes) currentEpisode = show.totalEpisodes;
            nextEpNum = currentEpisode < show.totalEpisodes ? currentEpisode + 1 : null;
            nextDate = nextEpNum ? new Date(start.getTime() + (currentEpisode) * show.intervalDays * 24 * 60 * 60 * 1000) : null;
        }

        const card = document.createElement('div');
        card.classList.add('schedule-card');

        // Use editor's original day/time if available
        const nextDateStr = show.useEditorData && show.day ? 
            show.day.toUpperCase().substring(0, 3) + ', ' + (nextDate ? nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '') :
            (nextDate ? nextDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '');

        const nextTimeStr = show.useEditorData && show.time ? show.time : 
            (nextDate ? nextDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '');

        card.innerHTML = `
            <div class="card-top">
                <img src="${show.image}" alt="${show.title}">
                <div class="schedule-details">
                    <h3>${show.title}</h3>
                    <div class="tags">
                        <span class="tag ${show.platform}">${show.platform}</span>
                        <span class="tag ${show.language}">${show.language}</span>
                        <span class="tag ${show.type}">${show.type}</span>
                    </div>
                    ${nextDate ? `
                        <div class="episode-date-time">
                            <span class="date-badge">📅 ${nextDateStr}</span>
                            <span class="time-badge">🕒 ${nextTimeStr}</span>
                            ${!isMovie ? '<span class="status-badge">📺 DAILY</span>' : ''}
                        </div>` : ''}
                    ${isMovie ? 
                        `<div class="release-time">${nextDate ? 'Movie Premiere' : '✅ Available Now!'}</div>` :
                        `<div class="release-time">Episode ${currentEpisode} of ${show.totalEpisodes}</div>
                         ${nextEpNum ? `<div class="next-episode-label">Next Episode: Ep ${nextEpNum}</div>` : ''}`
                    }
                    <div class="countdown" data-date="${nextDate ? nextDate.toISOString() : ''}">${nextDate ? '' : (isMovie ? '✅ Available Now!' : '✅ All Episodes Aired')}</div>
                    <div class="btn-row">
                        ${nextDate ? `<button class="btn" onclick="setReminder('${show.title}${isMovie ? '' : ' Ep ' + nextEpNum}','${nextDate.toISOString()}')">Set Reminder</button>` : ''}
                    </div>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

function renderWeekly() {
    const container = document.getElementById('weekly-container');
    container.innerHTML = '';
    const now = new Date();

    weeklyEpisodes.forEach(ep => {
        const start = new Date(ep.startDate);
        
        // If data is from editor, use it directly without calculation
        let currentEpisode, nextEpNum, nextDate;
        
        if (ep.useEditorData) {
            // Use editor data as-is
            currentEpisode = ep.currentEpisode;
            nextEpNum = currentEpisode < ep.totalEpisodes ? currentEpisode + 1 : null;
            // Next episode airs on the scheduled day/time
            nextDate = nextEpNum ? start : null;
        } else {
            // Calculate for hardcoded data
            const weeksPassed = Math.floor((now - start) / (1000 * 60 * 60 * 24 * ep.intervalDays));
            currentEpisode = ep.currentEpisode + weeksPassed;
            
            // Safety checks
            if (currentEpisode < 0) currentEpisode = 0;
            if (currentEpisode > ep.totalEpisodes) currentEpisode = ep.totalEpisodes;
            
            nextEpNum = currentEpisode < ep.totalEpisodes ? currentEpisode + 1 : null;
            nextDate = nextEpNum ? new Date(start.getTime() + (currentEpisode) * ep.intervalDays * 24 * 60 * 60 * 1000) : null;
        }

        const card = document.createElement('div');
        card.classList.add('schedule-card');

        // Use editor's original day/time if available
        const nextDateStr = ep.useEditorData && ep.day ? 
            ep.day.toUpperCase().substring(0, 3) + ', ' + (nextDate ? nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '') :
            (nextDate ? nextDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '');

        const nextTimeStr = ep.useEditorData && ep.time ? ep.time : 
            (nextDate ? nextDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '');

        card.innerHTML = `
            <div class="card-top">
                <img src="${ep.image}" alt="${ep.title}">
                <div class="schedule-details">
                    <h3>${ep.title}</h3>
                    <div class="tags">
                        <span class="tag ${ep.platform}">${ep.platform}</span>
                        <span class="tag ${ep.language}">${ep.language}</span>
                        <span class="tag ${ep.type}">${ep.type}</span>
                    </div>
                    ${nextDate ? `
                        <div class="episode-date-time">
                            <span class="date-badge">📅 ${nextDateStr}</span>
                            <span class="time-badge">🕒 ${nextTimeStr}</span>
                            <span class="status-badge">📺 WEEKLY</span>
                        </div>` : ''}
                    <div class="release-time">Episode ${currentEpisode} of ${ep.totalEpisodes}</div>
                    ${nextEpNum ? `<div class="next-episode-label">Next Episode: Ep ${nextEpNum}</div>` : ''}
                    <div class="countdown" data-date="${nextDate ? nextDate.toISOString() : ''}">${nextDate ? '' : '✅ All Episodes Released'}</div>
                    <div class="btn-row">
                        ${nextDate ? `<button class="btn" onclick="setReminder('${ep.title} Ep ${nextEpNum}','${nextDate.toISOString()}')">Set Reminder</button>` : ''}
                    </div>
                    <div class="episode-grid">
                        ${Array.from({ length: ep.totalEpisodes }, (_, i) => {
            const epNum = i + 1;
            let className = 'episode-box';
            if (epNum <= currentEpisode) className += ' current';
            else if (epNum === nextEpNum) className += ' next-ep';

            return `<span class="${className}">Ep ${epNum}</span>`;
        }).join('')}
                    </div>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

/* ----------------- TV UPDATE FUNCTIONS ----------------- */
let currentTVIndex = 0;
let tvUpdateInterval;

function initTVUpdates() {
    updateTVDisplay();
    // Update TV every 5 seconds
    tvUpdateInterval = setInterval(updateTVDisplay, 5000);
}

function updateTVDisplay() {
    const allShows = [...tvSchedule, ...weeklyEpisodes, ...upcomingAnime];
    const now = new Date();
    
    // Filter shows that are currently airing or upcoming
    const activeShows = allShows.filter(show => {
        if (show.startDate) {
            const startDate = new Date(show.startDate);
            return startDate <= now || (now - startDate) < (7 * 24 * 60 * 60 * 1000); // Within a week
        } else if (show.releaseDate) {
            const releaseDate = new Date(show.releaseDate);
            return releaseDate >= now; // Upcoming shows
        }
        return false;
    });
    
    if (activeShows.length === 0) return;
    
    // Cycle through shows
    const currentShow = activeShows[currentTVIndex % activeShows.length];
    currentTVIndex++;
    
    // Update TV display
    const playingTitle = document.querySelector('.playing-title');
    const playingTime = document.querySelector('.playing-time');
    const progressFill = document.querySelector('.progress-fill');
    
    if (playingTitle && playingTime && progressFill) {
        playingTitle.textContent = currentShow.title;
        
        // Format time and platform
        let timeText = '';
        if (currentShow.startDate) {
            const startDate = new Date(currentShow.startDate);
            timeText = `${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} - ${currentShow.platform}`;
        } else if (currentShow.releaseDate) {
            const releaseDate = new Date(currentShow.releaseDate);
            timeText = `${releaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${currentShow.platform}`;
        }
        
        playingTime.textContent = timeText;
        
        // Animate progress bar
        const randomProgress = Math.floor(Math.random() * 40) + 30; // 30-70%
        progressFill.style.width = randomProgress + '%';
        
        // Add smooth transition
        progressFill.style.transition = 'width 1s ease-in-out';
    }
}

function getCurrentlyAiring() {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Find shows that should be airing now based on their schedule
    for (const show of tvSchedule) {
        const startDate = new Date(show.startDate);
        const showHour = startDate.getHours();
        
        // Check if this show should be airing now (within 1 hour window)
        if (Math.abs(currentHour - showHour) <= 1) {
            return show;
        }
    }
    
    // If no TV show is currently airing, return a random active show
    const allShows = [...tvSchedule, ...weeklyEpisodes];
    return allShows[Math.floor(Math.random() * allShows.length)];
}

/* ----------------- UTILITY FUNCTIONS ----------------- */
// Tab switching functionality
function initTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });
}

// Update tab counts
function updateTabCounts() {
    document.getElementById('upcomingTabCount').textContent = upcomingAnime.length;
    document.getElementById('weeklyTabCount').textContent = weeklyEpisodes.length;
    document.getElementById('tvTabCount').textContent = tvSchedule.length;
    
    // Update hero stats
    document.getElementById('upcomingCount').textContent = upcomingAnime.length;
    document.getElementById('weeklyCount').textContent = weeklyEpisodes.length;
    document.getElementById('dailyCount').textContent = tvSchedule.length;
}

function updateCountdown() {
    document.querySelectorAll(".countdown").forEach(cd => {
        const dateStr = cd.getAttribute("data-date");
        if (!dateStr) return;
        const date = new Date(dateStr).getTime();
        const now = new Date().getTime();
        const diff = date - now;

        if (diff <= 0) {
            cd.textContent = "🎬 Available Now!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        cd.textContent = `Next Episode in 🕒 ${days}d ${hours}h ${minutes}m ${seconds}s`;
    });
}

function setReminder(title, datetime) {
    const start = new Date(datetime);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start.toISOString().replace(/-|:|\.\d+/g, '')}/${end.toISOString().replace(/-|:|\.\d+/g, '')}`;
    window.open(url, '_blank');
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

/* ----------------- SYSTEM THEME DETECTION ----------------- */
// Theme detection is now handled by theme-manager.js
// if (window.matchMedia) {
//     window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
//         const themeOverride = localStorage.getItem('themeOverride');

//         if (themeOverride !== 'true') {
//             const newTheme = e.matches ? 'light' : 'default';
//             document.documentElement.setAttribute('data-theme', newTheme);
//             document.querySelector('.schedule-wrapper').setAttribute('data-theme', newTheme);
//         }
//     });
// }

/* ----------------- AUTO UPDATE INTERVALS ----------------- */
setInterval(updateCountdown, 1000);

setInterval(() => {
    renderWeekly();
    renderUpcoming();
    renderTvSchedule();
    updateTabCounts();
}, 60000);

// Cleanup TV updates when page is unloaded
window.addEventListener('beforeunload', () => {
    if (tvUpdateInterval) {
        clearInterval(tvUpdateInterval);
    }
});