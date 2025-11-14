/**
 * Firebase Posts Manager - Hybrid System
 * Priority: Firebase → JSON → localStorage
 */

class FirebasePostsManager {
    constructor() {
        this.storageKey = 'tadb_posts';
        this.jsonFile = 'data/posts.json';
        this.firebasePath = 'posts';
        this.postsCache = null;
        this.dataSource = null; // 'firebase', 'json', or 'localStorage'
        this.initPromise = this.init();
    }

    async init() {
        console.log('🔥 Initializing Firebase Posts Manager...');
        
        // Load from Firebase ONLY
        const firebasePosts = await this.loadFromFirebase();
        if (firebasePosts && firebasePosts.length > 0) {
            this.postsCache = firebasePosts;
            this.dataSource = 'firebase';
            console.log(`✅ Loaded ${firebasePosts.length} posts from Firebase`);
            return true;
        }
        
        console.log('⚠️ No posts found in Firebase');
        this.postsCache = [];
        return false;
    }

    // Load from Firebase
    async loadFromFirebase() {
        try {
            // Wait for Posts Firebase to be ready (up to 10 seconds)
            console.log('⏳ Waiting for Posts Firebase...');
            let attempts = 0;
            while (attempts < 100) {
                if (window.postsFirebaseReady && window.postsFirebaseDB) {
                    console.log('✅ Posts Firebase detected!');
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
                
                if (attempts % 10 === 0) {
                    console.log(`⏳ Still waiting... (${attempts/10}s)`);
                }
            }
            
            if (!window.postsFirebaseDB) {
                console.error('❌ Posts Firebase not available after 10 seconds');
                console.error('Check: Posts Firebase initialized?', window.postsFirebaseReady);
                console.error('Check: Database available?', !!window.postsFirebaseDB);
                return null;
            }

            console.log('🔥 Posts Firebase is ready, loading posts...');
            const db = window.postsFirebaseDB;
            const snapshot = await db.ref(this.firebasePath).once('value');
            
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Convert object to array if needed
                let posts = Array.isArray(data) ? data : Object.values(data);
                posts = posts.filter(p => p && p.id); // Filter out null/invalid entries
                console.log(`📦 Found ${posts.length} posts in Firebase`);
                return posts.length > 0 ? posts : null;
            }
            
            console.log('📭 Firebase database is empty - no posts yet');
            return null;
        } catch (error) {
            console.error('❌ Error loading from Firebase:', error);
            console.error('Error details:', error.message);
            return null;
        }
    }



    // Sync to Firebase
    async syncToFirebase(posts) {
        try {
            // Wait for Posts Firebase to be ready
            let attempts = 0;
            while (!window.postsFirebaseDB && attempts < 50) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (!window.postsFirebaseDB) {
                console.log('⚠️ Posts Firebase not available for sync');
                return false;
            }

            const db = window.postsFirebaseDB;
            
            // Clean posts data before saving
            const cleanPosts = posts.map(post => ({...post}));
            
            await db.ref(this.firebasePath).set(cleanPosts);
            console.log(`✅ Synced ${cleanPosts.length} posts to Firebase`);
            return true;
        } catch (error) {
            console.error('Error syncing to Firebase:', error);
            return false;
        }
    }

    // Get all posts (async)
    async getAllPosts() {
        await this.initPromise;
        return this.postsCache || [];
    }

    // Get all posts (sync - for backward compatibility)
    getAllPostsImmediate() {
        return this.postsCache || [];
    }

    // Get single post by ID
    async getPostById(id) {
        const posts = await this.getAllPosts();
        return posts.find(post => post.id === parseInt(id));
    }

    // Save post (to Firebase only)
    async savePost(postData) {
        const posts = await this.getAllPosts();
        const existingIndex = posts.findIndex(p => p.id === postData.id);

        if (existingIndex >= 0) {
            // Update existing
            posts[existingIndex] = postData;
        } else {
            // Add new
            postData.id = this.generateId(posts);
            posts.push(postData);
        }

        // Save to Firebase only
        this.postsCache = posts;
        await this.syncToFirebase(posts);

        return postData;
    }

    // Delete post (from Firebase only)
    async deletePost(id) {
        const posts = await this.getAllPosts();
        const filteredPosts = posts.filter(p => p.id !== parseInt(id));
        
        this.postsCache = filteredPosts;
        await this.syncToFirebase(filteredPosts);
        
        return true;
    }

    // Generate unique ID
    generateId(posts) {
        if (posts.length === 0) return 1;
        const maxId = Math.max(...posts.map(p => p.id || 0));
        return maxId + 1;
    }

    // Get data source info
    getDataSource() {
        return this.dataSource;
    }

    // Force refresh from Firebase
    async refreshFromFirebase() {
        const posts = await this.loadFromFirebase();
        if (posts) {
            this.postsCache = posts;
            this.dataSource = 'firebase';
            return posts;
        }
        return null;
    }
}

// Initialize and make globally available
window.firebasePostsManager = new FirebasePostsManager();

// For backward compatibility
window.postsManager = {
    getAllPosts: async () => await window.firebasePostsManager.getAllPosts(),
    getAllPostsImmediate: () => window.firebasePostsManager.getAllPostsImmediate(),
    getPostById: async (id) => await window.firebasePostsManager.getPostById(id),
    savePost: async (post) => await window.firebasePostsManager.savePost(post),
    deletePost: async (id) => await window.firebasePostsManager.deletePost(id)
};

console.log('🔥 Firebase Posts Manager loaded');
