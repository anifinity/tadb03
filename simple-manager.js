/**
 * Simple Posts Manager
 * Loads from posts-data.js (committed to GitHub)
 * Edits in localStorage (local only)
 */

class SimpleManager {
    constructor() {
        this.storageKey = 'tadb_posts';
    }

    // Get all posts
    getAllPosts() {
        // First try posts-data.js (public data)
        if (window.POSTS_DATA && window.POSTS_DATA.length > 0) {
            console.log(`✅ Loaded ${window.POSTS_DATA.length} posts from posts-data.js`);
            return window.POSTS_DATA;
        }
        
        // Fall back to localStorage (personal data)
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                const posts = JSON.parse(data);
                console.log(`✅ Loaded ${posts.length} posts from localStorage`);
                return posts;
            }
        } catch (error) {
            console.error('Error loading posts:', error);
        }
        
        return [];
    }

    // Get single post
    getPostById(id) {
        const posts = this.getAllPosts();
        return posts.find(p => p.id === parseInt(id));
    }

    // Save post (to localStorage)
    savePost(post) {
        const posts = this.getAllPosts();
        const index = posts.findIndex(p => p.id === post.id);
        
        if (index >= 0) {
            posts[index] = post;
        } else {
            post.id = this.generateId(posts);
            posts.push(post);
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(posts));
        console.log(`✅ Saved post: ${post.title}`);
        return post;
    }

    // Delete post
    deletePost(id) {
        const posts = this.getAllPosts();
        const filtered = posts.filter(p => p.id !== parseInt(id));
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        return true;
    }

    // Generate ID
    generateId(posts) {
        if (posts.length === 0) return 1;
        return Math.max(...posts.map(p => p.id || 0)) + 1;
    }

    // Generate posts-data.js file
    generatePostsDataFile() {
        const posts = this.getAllPosts();
        const jsContent = `// Posts Data - Auto-generated from Post Editor
// Last updated: ${new Date().toLocaleString()}

window.POSTS_DATA = ${JSON.stringify(posts, null, 2)};
`;
        
        const blob = new Blob([jsContent], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'posts-data.js';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        return posts.length;
    }
}

// Initialize
window.postsManager = new SimpleManager();
console.log('✅ Simple Manager loaded');
