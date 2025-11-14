// Simple Voice Artist Display System - No Storage
// Directly displays cast and crew data from post-script.js

class VoiceArtistDisplay {
    constructor() {
        this.init();
    }

    init() {
        console.log('Voice Artist Display System initialized');
        
        if (window.location.pathname.includes('voice-artists-real.html')) {
            // Hide loading message
            const loadingMessage = document.getElementById('loadingMessage');
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
            
            // Load and display data directly
            this.displayArtists();
        }
    }

    // Check if role is a production team role
    isProductionRole(role) {
        const productionRoles = [
            'Script Writer', 'Director', 'Producer', 'Sound Engineer',
            'Music Director', 'Editor', 'Assistant Director', 'Creative Director',
            'Story Writer', 'Screenplay Writer', 'Dialogue Writer', 'Music Composer',
            'Background Score', 'Sound Designer', 'Audio Engineer', 'Mixing Engineer'
        ];
        return productionRoles.some(prodRole => role.includes(prodRole));
    }

    // Get department icon based on role
    getDepartmentIcon(role) {
        if (role.includes('Writer')) return 'fas fa-pen';
        if (role.includes('Director')) return 'fas fa-video';
        if (role.includes('Sound') || role.includes('Audio')) return 'fas fa-volume-up';
        if (role.includes('Music')) return 'fas fa-music';
        if (role.includes('Producer')) return 'fas fa-film';
        if (role.includes('Editor')) return 'fas fa-cut';
        return 'fas fa-cogs';
    }

    // Display artists directly from post data
    displayArtists() {
        const artistsList = document.querySelector('#voiceArtistsList');
        if (!artistsList) return;

        // Check if post data is available
        if (typeof detailedMovieData === 'undefined') {
            artistsList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <p>No data available. Make sure post-script.js is loaded.</p>
                </div>
            `;
            return;
        }

        // Collect all artists from all movies
        const allArtists = [];
        let artistCounter = 1;

        Object.values(detailedMovieData).forEach(movie => {
            // Add cast members
            if (movie.cast && Array.isArray(movie.cast)) {
                movie.cast.forEach(castMember => {
                    if (castMember.actorName && castMember.characterName) {
                        allArtists.push({
                            id: artistCounter++,
                            name: castMember.actorName,
                            role: 'Voice Actor',
                            avatar: castMember.actorImage || 'https://via.placeholder.com/150',
                            character: castMember.characterName,
                            anime: movie.title,
                            characterImage: castMember.characterImage || movie.poster,
                            type: 'voice'
                        });
                    }
                });
            }

            // Add crew members
            if (movie.crew && Array.isArray(movie.crew)) {
                movie.crew.forEach(crewMember => {
                    if (crewMember.name && crewMember.role) {
                        allArtists.push({
                            id: artistCounter++,
                            name: crewMember.name,
                            role: crewMember.role,
                            avatar: crewMember.avatar || 'https://via.placeholder.com/150',
                            project: crewMember.project || movie.title,
                            anime: movie.title, // Use original anime title
                            projectImage: crewMember.projectImage || movie.poster, // Use projectImage from crew data
                            type: 'production'
                        });
                    }
                });
            }

            // Add dubbing studios
            if (movie.dubbingStudios && Array.isArray(movie.dubbingStudios)) {
                movie.dubbingStudios.forEach(studio => {
                    if (studio.name && studio.role) {
                        allArtists.push({
                            id: artistCounter++,
                            name: studio.name,
                            role: studio.role,
                            avatar: studio.avatar || 'https://via.placeholder.com/150',
                            project: studio.name,
                            anime: movie.title, // Use original anime title
                            projectImage: studio.projectImage || movie.poster, // Use projectImage from studio data
                            type: 'studio'
                        });
                    }
                });
            }
        });

        // Group artists by name
        const groupedArtists = {};
        allArtists.forEach(artist => {
            const key = artist.name.toLowerCase();
            if (!groupedArtists[key]) {
                groupedArtists[key] = {
                    name: artist.name,
                    role: artist.role,
                    avatar: artist.avatar,
                    works: []
                };
            }
            groupedArtists[key].works.push(artist);
        });

        // Display artists
        const artistsArray = Object.values(groupedArtists);
        if (artistsArray.length === 0) {
            artistsList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <p>No artists found in the data.</p>
                </div>
            `;
            return;
        }

        // Render artists
        artistsList.innerHTML = '';
        artistsArray.forEach((artist, index) => {
            const artistElement = this.createArtistElement(artist, index + 1);
            artistsList.appendChild(artistElement);
        });

        // Update stats
        this.updateStats(artistsArray);
        
        // Initialize leaderboard
        this.initializeLeaderboard(artistsArray);
        
        // Initialize search functionality
        this.initializeSearch(artistsArray);
        
        // Initialize accordion
        this.initializeAccordion();
    }

    // Create artist element
    createArtistElement(artist, number) {
        const artistDiv = document.createElement('div');
        artistDiv.className = 'voice-artist-item';
        
        // Check if this is a production team member
        const isProduction = this.isProductionRole(artist.role);
        if (isProduction) {
            artistDiv.setAttribute('data-production-team', 'true');
        }

        // Separate voice work from production work
        const voiceWork = artist.works.filter(work => work.type === 'voice');
        const productionWork = artist.works.filter(work => work.type === 'production');

        const voiceHtml = voiceWork.map(work => `
            <div class="voice-character-card">
                <div class="voice-char-image-square">
                    <img alt="${work.character}" src="${work.characterImage}" onerror="this.src='https://via.placeholder.com/150'" />
                    <div class="char-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="voice-char-info">
                    <h4 class="voice-char-name">${work.character}</h4>
                    <p class="voice-char-anime">${work.anime}</p>
                    <div class="char-badge">Character</div>
                </div>
            </div>
        `).join('');

        const productionHtml = productionWork.map(work => {
            const icon = this.getDepartmentIcon(work.role);
            return `
                <div class="voice-character-card production-work-card">
                    <div class="voice-char-image-square">
                        <img alt="${work.anime}" src="${work.projectImage}" onerror="this.src='https://via.placeholder.com/150'" />
                        <div class="char-overlay production-overlay">
                            <i class="${icon}"></i>
                        </div>
                    </div>
                    <div class="voice-char-info">
                        <h4 class="voice-char-name">${work.anime}</h4>
                        <div class="char-badge production-badge">${work.role}</div>
                    </div>
                </div>
            `;
        }).join('');

        artistDiv.innerHTML = `
            <div class="voice-artist-header">
                <div class="artist-number">${number.toString().padStart(2, '0')}</div>
                <div class="voice-artist-name">
                    <h2>${artist.name}</h2>
                    <span class="voice-artist-role">${artist.role}</span>
                </div>
                <div class="expand-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="voice-artist-content" id="artist${number}">
                <div class="voice-artist-card">
                    <div class="artist-card-header">
                        <div class="artist-avatar-container">
                            <img alt="${artist.name}" class="voice-artist-avatar" src="${artist.avatar}" onerror="this.src='https://via.placeholder.com/150'" />
                            <div class="avatar-badge">
                                <i class="fas fa-microphone"></i>
                            </div>
                        </div>
                        <div class="voice-artist-info">
                            <h3 class="artist-name">${artist.name}</h3>
                            <p class="artist-title">${artist.role}</p>
                            <div class="artist-stats">
                                <span class="stat-item">
                                    <i class="fas fa-play-circle"></i>
                                    ${artist.works.length} Works
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                ${voiceWork.length > 0 ? `
                <div class="voice-characters-section">
                    <h3><i class="fas fa-theater-masks"></i> Characters Voiced</h3>
                    <div class="voice-characters-grid">
                        ${voiceHtml}
                    </div>
                </div>
                ` : ''}
                
                ${productionWork.length > 0 ? `
                <div class="voice-characters-section production-section">
                    <h3><i class="fas fa-cogs"></i> Production Work</h3>
                    <div class="voice-characters-grid">
                        ${productionHtml}
                    </div>
                </div>
                ` : ''}
            </div>
        `;

        return artistDiv;
    }

    // Update hero statistics
    updateStats(artists) {
        // Count artists based on their actual work, not just their primary role
        const voiceActors = artists.filter(artist => 
            artist.works.some(work => work.type === 'voice')
        );
        const productionCrew = artists.filter(artist => 
            artist.works.some(work => work.type === 'production')
        );
        const dubbingStudios = artists.filter(artist => 
            artist.works.some(work => work.type === 'studio')
        );
        
        let totalCharacters = 0;
        const animeSet = new Set();
        
        artists.forEach(artist => {
            artist.works.forEach(work => {
                if (work.type === 'voice') {
                    totalCharacters++;
                }
                animeSet.add(work.anime);
            });
        });

        // Update counters
        this.animateCounter('totalArtists', voiceActors.length);
        this.animateCounter('totalCharacters', totalCharacters);
        this.animateCounter('totalProductionTeam', productionCrew.length);
        this.animateCounter('totalDubbingStudios', dubbingStudios.length);
        this.animateCounter('totalAnimes', animeSet.size);
    }

    // Animate counter
    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let currentValue = 0;
        const increment = targetValue / 30;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentValue);
        }, 50);
    }

    // Initialize leaderboard functionality
    initializeLeaderboard(artists) {
        // Separate artists by type based on their actual work
        const voiceActors = artists.filter(artist => 
            artist.works.some(work => work.type === 'voice')
        );
        const productionCrew = artists.filter(artist => 
            artist.works.some(work => work.type === 'production')
        );
        const dubbingStudios = artists.filter(artist => 
            artist.works.some(work => work.type === 'studio')
        );
        
        // Sort by number of relevant works (descending)
        voiceActors.sort((a, b) => {
            const aVoiceCount = a.works.filter(work => work.type === 'voice').length;
            const bVoiceCount = b.works.filter(work => work.type === 'voice').length;
            return bVoiceCount - aVoiceCount;
        });
        productionCrew.sort((a, b) => {
            const aProductionCount = a.works.filter(work => work.type === 'production').length;
            const bProductionCount = b.works.filter(work => work.type === 'production').length;
            return bProductionCount - aProductionCount;
        });
        dubbingStudios.sort((a, b) => {
            const aStudioCount = a.works.filter(work => work.type === 'studio').length;
            const bStudioCount = b.works.filter(work => work.type === 'studio').length;
            return bStudioCount - aStudioCount;
        });
        
        // Populate leaderboards with specific work type counts
        this.populateLeaderboard('voiceArtistsLeaderboard', voiceActors.slice(0, 5), 'Characters', 'voice');
        this.populateLeaderboard('productionTeamLeaderboard', productionCrew.slice(0, 5), 'Projects', 'production');
        this.populateLeaderboard('dubbingStudiosLeaderboard', dubbingStudios.slice(0, 5), 'Projects', 'studio');
    }

    // Populate individual leaderboard
    populateLeaderboard(containerId, artists, countLabel, workType) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (artists.length === 0) {
            container.innerHTML = `
                <div class="leaderboard-empty">
                    <i class="fas fa-info-circle"></i>
                    <p>No data available yet</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        
        artists.forEach((artist, index) => {
            const position = index + 1;
            const isTopThree = position <= 3;
            
            const leaderboardItem = document.createElement('div');
            leaderboardItem.className = `leaderboard-item ${isTopThree ? 'top-three' : ''}`;
            
            // Calculate count based on work type
            let workCount = 0;
            if (workType) {
                workCount = artist.works.filter(work => work.type === workType).length;
            } else {
                workCount = artist.works.length;
            }
            
            // Get position icon for top 3
            let positionContent = '';
            if (position === 1) {
                positionContent = '<i class="fas fa-trophy position-icon gold"></i>';
            } else if (position === 2) {
                positionContent = '<i class="fas fa-medal position-icon silver"></i>';
            } else if (position === 3) {
                positionContent = '<i class="fas fa-award position-icon bronze"></i>';
            } else {
                positionContent = `<span class="position-number">${position}</span>`;
            }
            
            leaderboardItem.innerHTML = `
                <div class="position">
                    ${positionContent}
                </div>
                <div class="artist-info">
                    <img src="${artist.avatar}" alt="${artist.name}" class="leaderboard-avatar" onerror="this.src='https://via.placeholder.com/45'">
                    <div class="artist-details">
                        <div class="artist-name">${artist.name}</div>
                        <div class="artist-role">
                            <i class="role-icon ${this.getRoleIcon(artist.role)}"></i>
                            ${artist.role}
                        </div>
                    </div>
                </div>
                <div class="artist-count">
                    <div class="count-number">${workCount}</div>
                    <div class="count-label">${countLabel}</div>
                </div>
            `;
            
            container.appendChild(leaderboardItem);
        });
    }

    // Get role icon
    getRoleIcon(role) {
        if (role.includes('Voice')) return 'fas fa-microphone';
        if (role.includes('Writer')) return 'fas fa-pen';
        if (role.includes('Director')) return 'fas fa-video';
        if (role.includes('Sound') || role.includes('Audio')) return 'fas fa-volume-up';
        if (role.includes('Music')) return 'fas fa-music';
        if (role.includes('Producer')) return 'fas fa-film';
        if (role.includes('Editor')) return 'fas fa-cut';
        if (role.includes('Studio')) return 'fas fa-building';
        return 'fas fa-cogs';
    }

    // Initialize search functionality
    initializeSearch(artists) {
        const searchInputs = [
            document.getElementById('voiceArtistSearchInput'),
            document.getElementById('prominentSearchInput')
        ];
        
        const searchBtn = document.getElementById('voiceArtistSearchBtn');
        const clearBtns = [
            document.getElementById('clearSearchBtn'),
            document.getElementById('prominentClearBtn')
        ];
        
        // Store original artists for reset
        this.allArtists = artists;
        
        // Search function
        const performSearch = (query) => {
            const searchQuery = query.toLowerCase().trim();
            
            if (searchQuery === '') {
                this.showAllArtists();
                this.hideSearchNotice();
                return;
            }
            
            const filteredArtists = this.allArtists.filter(artist => {
                // Search in artist name
                if (artist.name.toLowerCase().includes(searchQuery)) return true;
                
                // Search in role
                if (artist.role.toLowerCase().includes(searchQuery)) return true;
                
                // Search in works (characters/projects)
                return artist.works.some(work => {
                    return work.character?.toLowerCase().includes(searchQuery) ||
                           work.anime?.toLowerCase().includes(searchQuery) ||
                           work.project?.toLowerCase().includes(searchQuery);
                });
            });
            
            this.displayFilteredArtists(filteredArtists, searchQuery);
            this.showSearchNotice(searchQuery, filteredArtists.length);
        };
        
        // Add event listeners to search inputs
        searchInputs.forEach(input => {
            if (input) {
                input.addEventListener('input', (e) => {
                    const query = e.target.value;
                    performSearch(query);
                    
                    // Show/hide clear buttons
                    clearBtns.forEach(btn => {
                        if (btn) {
                            btn.style.display = query ? 'flex' : 'none';
                        }
                    });
                    
                    // Sync other search input
                    searchInputs.forEach(otherInput => {
                        if (otherInput && otherInput !== input) {
                            otherInput.value = query;
                        }
                    });
                });
                
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        performSearch(input.value);
                        // Close navigation search box after search
                        if (input.id === 'voiceArtistSearchInput') {
                            closeSearchBox();
                        }
                    }
                });
            }
        });
        
        // Add event listener to search button
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInputs[0]?.value || '';
                performSearch(query);
                // Close navigation search box after search
                closeSearchBox();
            });
        }
        
        // Add event listeners to clear buttons
        clearBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    searchInputs.forEach(input => {
                        if (input) input.value = '';
                    });
                    clearBtns.forEach(clearBtn => {
                        if (clearBtn) clearBtn.style.display = 'none';
                    });
                    this.showAllArtists();
                    this.hideSearchNotice();
                });
            }
        });
    }
    
    // Display filtered artists
    displayFilteredArtists(artists, query) {
        const artistsList = document.querySelector('#voiceArtistsList');
        if (!artistsList) return;
        
        artistsList.innerHTML = '';
        
        if (artists.length === 0) {
            artistsList.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                    <h3 style="margin-bottom: 10px;">No results found</h3>
                    <p>No artists found matching "${query}". Try different keywords.</p>
                </div>
            `;
            return;
        }
        
        artists.forEach((artist, index) => {
            const artistElement = this.createArtistElement(artist, index + 1);
            artistsList.appendChild(artistElement);
        });
        
        // Reinitialize accordion for filtered results
        this.initializeAccordion();
    }
    
    // Show all artists
    showAllArtists() {
        const artistsList = document.querySelector('#voiceArtistsList');
        if (!artistsList || !this.allArtists) return;
        
        artistsList.innerHTML = '';
        this.allArtists.forEach((artist, index) => {
            const artistElement = this.createArtistElement(artist, index + 1);
            artistsList.appendChild(artistElement);
        });
        
        // Reinitialize accordion
        this.initializeAccordion();
    }
    
    // Show search notice
    showSearchNotice(query, resultCount) {
        const noticeSection = document.getElementById('searchNoticeSection');
        const searchQuerySpan = document.getElementById('searchQuery');
        
        if (noticeSection && searchQuerySpan) {
            searchQuerySpan.textContent = query;
            noticeSection.style.display = 'block';
            
            // Update notice content based on results
            const noticeContent = noticeSection.querySelector('.notice-content p');
            if (noticeContent) {
                if (resultCount === 0) {
                    noticeContent.innerHTML = `No results found for "<span id="searchQuery">${query}</span>". Try different keywords.`;
                } else {
                    noticeContent.innerHTML = `Found ${resultCount} result${resultCount !== 1 ? 's' : ''} for "<span id="searchQuery">${query}</span>".`;
                }
            }
        }
    }
    
    // Hide search notice
    hideSearchNotice() {
        const noticeSection = document.getElementById('searchNoticeSection');
        if (noticeSection) {
            noticeSection.style.display = 'none';
        }
    }

    // Initialize accordion functionality
    initializeAccordion() {
        const artistItems = document.querySelectorAll('.voice-artist-item');
        
        artistItems.forEach(item => {
            const header = item.querySelector('.voice-artist-header');
            if (header) {
                header.addEventListener('click', () => {
                    // Close all other items
                    artistItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
    }
}

// Global instance for external access
let voiceArtistDisplayInstance = null;

// Global clear search function
function clearSearch() {
    if (voiceArtistDisplayInstance) {
        const searchInputs = [
            document.getElementById('voiceArtistSearchInput'),
            document.getElementById('prominentSearchInput')
        ];
        const clearBtns = [
            document.getElementById('clearSearchBtn'),
            document.getElementById('prominentClearBtn')
        ];
        
        searchInputs.forEach(input => {
            if (input) input.value = '';
        });
        clearBtns.forEach(btn => {
            if (btn) btn.style.display = 'none';
        });
        
        voiceArtistDisplayInstance.showAllArtists();
        voiceArtistDisplayInstance.hideSearchNotice();
    }
}

// Navigation Search Toggle Functionality
function initializeNavigationSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchBox = document.getElementById('searchBox');
    
    if (searchToggle && searchBox) {
        // Search toggle functionality
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSearchBox();
        });
        
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchToggle.contains(e.target) && !searchBox.contains(e.target)) {
                closeSearchBox();
            }
        });
        
        // Close search on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSearchBox();
            }
        });
    }
}

function toggleSearchBox() {
    const searchBox = document.getElementById('searchBox');
    const searchToggle = document.getElementById('searchToggle');
    
    if (searchBox.classList.contains('active')) {
        closeSearchBox();
    } else {
        openSearchBox();
    }
}

function openSearchBox() {
    const searchBox = document.getElementById('searchBox');
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('voiceArtistSearchInput');
    
    searchBox.classList.add('active');
    searchToggle.innerHTML = '<i class="fas fa-times"></i>';
    
    // Focus on input with delay for smooth animation
    setTimeout(() => {
        if (searchInput) {
            searchInput.focus();
        }
    }, 300);
}

function closeSearchBox() {
    const searchBox = document.getElementById('searchBox');
    const searchToggle = document.getElementById('searchToggle');
    
    searchBox.classList.remove('active');
    searchToggle.innerHTML = '<i class="fas fa-search"></i>';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation search first
    initializeNavigationSearch();
    
    // Then initialize voice artist display
    setTimeout(() => {
        voiceArtistDisplayInstance = new VoiceArtistDisplay();
    }, 100);
});