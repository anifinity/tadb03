// Content Creators Management System
// Manages content creators data

class CreatorsManager {
    constructor() {
        this.storageKey = 'tadb_creators';
        this.init();
    }

    init() {
        // Initialize with default creators if empty
        if (!this.getAllCreators().length) {
            this.initializeDefaultCreators();
        }
    }

    // Get all creators from localStorage
    getAllCreators() {
        try {
            const creators = localStorage.getItem(this.storageKey);
            return creators ? JSON.parse(creators) : [];
        } catch (error) {
            console.error('Error loading creators:', error);
            return [];
        }
    }

    // Save all creators to localStorage
    saveCreators(creators) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(creators));
            return true;
        } catch (error) {
            console.error('Error saving creators:', error);
            return false;
        }
    }

    // Get single creator by ID
    getCreatorById(id) {
        const creators = this.getAllCreators();
        return creators.find(creator => creator.id === parseInt(id));
    }

    // Add or update a creator
    saveCreator(creatorData) {
        const creators = this.getAllCreators();
        const existingIndex = creators.findIndex(c => c.id === creatorData.id);

        if (existingIndex >= 0) {
            // Update existing creator
            creators[existingIndex] = { ...creators[existingIndex], ...creatorData };
        } else {
            // Add new creator with auto-generated ID
            const newId = creators.length > 0 ? Math.max(...creators.map(c => c.id)) + 1 : 1;
            creatorData.id = newId;
            creators.push(creatorData);
        }

        return this.saveCreators(creators);
    }

    // Delete a creator
    deleteCreator(id) {
        const creators = this.getAllCreators();
        const filteredCreators = creators.filter(c => c.id !== parseInt(id));
        return this.saveCreators(filteredCreators);
    }

    // Initialize with default creators
    initializeDefaultCreators() {
        const defaultCreators = [
            {
                id: 1,
                name: "TADB",
                role: "Database Creator",
                dataCreator: "tadb",
                avatar: "https://blogger.googleusercontent.com/img/a/AVvXsEjMyJdgsufmZrNxfCdxv9X87MdndtuZP1mSaXtiRxeTUVEYKWRzMn6y1ZnrrZ2SEDuyidYa2M4RvY0uAi0KrP-evLJYsv0_YbGAXz3sT1DafCucVsYIq8BNk_9MNeRmvD6nIsFGKNbHISTfX0h4iqR0AecbKy8vl7WR5Y-kJT5-9PjbHTTL5wKIV495Jc8=s16000",
                bio: "Telugu Anime Database - Your ultimate source for Telugu anime content",
                badge: "Founder",
                stats: {
                    stat1: { number: "50+", label: "Posts" },
                    stat2: { number: "10K+", label: "Followers" },
                    stat3: { number: "2024", label: "Founded" }
                },
                social: {
                    instagram: "https://www.instagram.com/teluguanime.db/",
                    youtube: "https://www.youtube.com/@Mugentales"
                },
                suggestedAnimes: [
                    {
                        title: "DanDaDan",
                        platform: "Crunchyroll",
                        rating: "8.3",
                        episodes: "24 Episodes",
                        genres: ["Action", "Comedy"],
                        poster: "https://u.livechart.me/anime_visuals/local_version/10337/image/a4be70dfa4ae919f0c2470e1bbffb0b8.webp/large.jpg"
                    },
                    {
                        title: "SPY x FAMILY",
                        platform: "Crunchyroll",
                        rating: "8.8",
                        episodes: "25 Episodes",
                        genres: ["Action", "Comedy"],
                        poster: "https://u.livechart.me/anime/visual/6875/image/00524cc5d2d7dd8506da05bd4d10d38e.jfif/large.jpg"
                    }
                ],
                latestVideos: [
                    {
                        title: "Latest Telugu Anime Updates",
                        channel: "TADB Team",
                        views: "1.2K views",
                        time: "2 days ago",
                        duration: "10:25",
                        videoId: "u2QaG4G74Kg"
                    },
                    {
                        title: "Database Creation Process",
                        channel: "TADB Team",
                        views: "2.5K views",
                        time: "5 days ago",
                        duration: "15:30",
                        videoId: "u2QaG4G74Kg"
                    }
                ]
            },
            {
                id: 2,
                name: "Telchi Anime",
                role: "YouTube Channel",
                dataCreator: "telchi",
                avatar: "https://via.placeholder.com/120x120/133978/ffffff?text=TC",
                bio: "Dedicated to bringing the best Telugu anime content and reviews to the community. Creating engaging videos about anime culture and Telugu dubbing.",
                badge: "Channel",
                stats: {
                    stat1: { number: "25+", label: "Videos" },
                    stat2: { number: "5K+", label: "Subscribers" },
                    stat3: { number: "100K+", label: "Views" }
                },
                social: {
                    instagram: "",
                    youtube: ""
                },
                suggestedAnimes: [
                    {
                        title: "Black Butler Public School",
                        platform: "Crunchyroll",
                        rating: "8.2",
                        episodes: "36 Episodes",
                        genres: ["Mystery", "Supernatural"],
                        poster: "https://u.livechart.me/anime/visual/6884/image/7963459087c881bb8db7eb20830a4ef8.png/large.jpg"
                    },
                    {
                        title: "Vinland Saga",
                        platform: "Crunchyroll",
                        rating: "8.9",
                        episodes: "24 Episodes",
                        genres: ["Action", "Historical"],
                        poster: "https://u.livechart.me/anime_visuals/local_version/2981/image/80070608f5d264e77b0bb4f1fe24096b.webp/large.jpg"
                    }
                ],
                latestVideos: [
                    {
                        title: "Anime Review: Naruto Telugu Dub",
                        channel: "Telchi Anime",
                        views: "3.1K views",
                        time: "3 days ago",
                        duration: "12:15",
                        videoId: "u2QaG4G74Kg"
                    },
                    {
                        title: "Top 10 Telugu Dubbed Anime",
                        channel: "Telchi Anime",
                        views: "1.8K views",
                        time: "1 week ago",
                        duration: "8:45",
                        videoId: "u2QaG4G74Kg"
                    }
                ]
            },
            {
                id: 3,
                name: "Professor",
                role: "Digital Artist",
                dataCreator: "professor",
                avatar: "https://via.placeholder.com/120x120/ff6b35/ffffff?text=P",
                bio: "Creating amazing artwork and designs for the Telugu anime community. Specializing in character art, fan art, and digital illustrations.",
                badge: "Artist",
                stats: {
                    stat1: { number: "100+", label: "Artworks" },
                    stat2: { number: "3K+", label: "Likes" },
                    stat3: { number: "500+", label: "Shares" }
                },
                social: {
                    instagram: "",
                    youtube: ""
                },
                suggestedAnimes: [
                    {
                        title: "Gachiakuta",
                        platform: "Crunchyroll",
                        rating: "8.1",
                        episodes: "12 Episodes",
                        genres: ["Adventure", "Comedy"],
                        poster: "https://u.livechart.me/anime_visuals/local_version/14169/image/1c76fdcf1cdd76892b407e54f7fdb542.webp/large.jpg"
                    },
                    {
                        title: "Ranking of Kings",
                        platform: "Crunchyroll",
                        rating: "8.7",
                        episodes: "23 Episodes",
                        genres: ["Fantasy", "Adventure"],
                        poster: "https://u.livechart.me/anime_visuals/local_version/213/image/da11f281fa013322c52cf32ae7663437.jpeg/large.jpg"
                    }
                ],
                latestVideos: [
                    {
                        title: "Editing Process Explained",
                        channel: "Professor",
                        views: "890 views",
                        time: "1 week ago",
                        duration: "8:45",
                        videoId: "u2QaG4G74Kg"
                    },
                    {
                        title: "Digital Art Tutorial",
                        channel: "Professor",
                        views: "1.5K views",
                        time: "4 days ago",
                        duration: "15:20",
                        videoId: "u2QaG4G74Kg"
                    }
                ]
            },
            {
                id: 4,
                name: "Rae",
                role: "Graphic Designer",
                dataCreator: "rae",
                avatar: "https://via.placeholder.com/120x120/10b981/ffffff?text=R",
                bio: "Specializing in anime poster designs and visual content creation. Creating stunning graphics for the Telugu anime community.",
                badge: "Designer",
                stats: {
                    stat1: { number: "75+", label: "Designs" },
                    stat2: { number: "2K+", label: "Views" },
                    stat3: { number: "300+", label: "Downloads" }
                },
                social: {
                    instagram: "",
                    youtube: ""
                },
                suggestedAnimes: [
                    {
                        title: "SPY x FAMILY",
                        platform: "Crunchyroll",
                        rating: "8.8",
                        episodes: "25 Episodes",
                        genres: ["Action", "Comedy"],
                        poster: "https://u.livechart.me/anime/visual/6875/image/00524cc5d2d7dd8506da05bd4d10d38e.jfif/large.jpg"
                    },
                    {
                        title: "DanDaDan",
                        platform: "Crunchyroll",
                        rating: "8.3",
                        episodes: "24 Episodes",
                        genres: ["Action", "Comedy"],
                        poster: "https://u.livechart.me/anime_visuals/local_version/10337/image/a4be70dfa4ae919f0c2470e1bbffb0b8.webp/large.jpg"
                    }
                ],
                latestVideos: [
                    {
                        title: "Poster Design Process",
                        channel: "Rae",
                        views: "750 views",
                        time: "2 days ago",
                        duration: "6:30",
                        videoId: "u2QaG4G74Kg"
                    },
                    {
                        title: "Graphic Design Tips",
                        channel: "Rae",
                        views: "1.1K views",
                        time: "6 days ago",
                        duration: "11:45",
                        videoId: "u2QaG4G74Kg"
                    }
                ]
            },
            {
                id: 5,
                name: "MRP Networks",
                role: "Design Studio",
                dataCreator: "mrp",
                avatar: "https://via.placeholder.com/120x120/8b5cf6/ffffff?text=MRP",
                bio: "Professional poster design and visual content creation for anime projects. Leading design studio for Telugu anime promotional materials.",
                badge: "Studio",
                stats: {
                    stat1: { number: "200+", label: "Projects" },
                    stat2: { number: "15K+", label: "Reach" },
                    stat3: { number: "50+", label: "Clients" }
                },
                social: {
                    instagram: "https://www.instagram.com/mrp_network/",
                    youtube: ""
                },
                suggestedAnimes: [
                    {
                        title: "Ranking of Kings",
                        platform: "Crunchyroll",
                        rating: "8.7",
                        episodes: "23 Episodes",
                        genres: ["Fantasy", "Adventure"],
                        poster: "https://u.livechart.me/anime_visuals/local_version/213/image/da11f281fa013322c52cf32ae7663437.jpeg/large.jpg"
                    },
                    {
                        title: "Black Butler Public School",
                        platform: "Crunchyroll",
                        rating: "8.2",
                        episodes: "36 Episodes",
                        genres: ["Mystery", "Supernatural"],
                        poster: "https://u.livechart.me/anime/visual/6884/image/7963459087c881bb8db7eb20830a4ef8.png/large.jpg"
                    }
                ],
                latestVideos: [
                    {
                        title: "Studio Workflow Process",
                        channel: "MRP Networks",
                        views: "2.3K views",
                        time: "1 day ago",
                        duration: "14:20",
                        videoId: "u2QaG4G74Kg"
                    },
                    {
                        title: "Professional Design Tips",
                        channel: "MRP Networks",
                        views: "1.7K views",
                        time: "3 days ago",
                        duration: "9:15",
                        videoId: "u2QaG4G74Kg"
                    }
                ]
            }
        ];

        this.saveCreators(defaultCreators);
    }

    // Get creators by role
    getCreatorsByRole(role) {
        const creators = this.getAllCreators();
        return creators.filter(c => c.role.toLowerCase().includes(role.toLowerCase()));
    }
}

// Create global instance
window.creatorsManager = new CreatorsManager();
