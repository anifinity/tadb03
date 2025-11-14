// 🎯 SUPER EASY Posts Manager - localStorage + Manual Export
// No Firebase, No Complexity, Just Works! ✅

class EasyPostsManager {
    constructor() {
        this.STORAGE_KEY = 'anime_posts';
    }

    // 📝 Get all posts from localStorage
    getAllPosts() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    // ➕ Add new post
    addPost(post) {
        const posts = this.getAllPosts();
        
        // Add ID and timestamp
        post.id = Date.now().toString();
        post.timestamp = new Date().toISOString();
        
        posts.unshift(post); // Add to beginning
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
        
        return post;
    }

    // ✏️ Update existing post
    updatePost(id, updatedPost) {
        const posts = this.getAllPosts();
        const index = posts.findIndex(p => p.id === id);
        
        if (index !== -1) {
            // Keep original ID and timestamp, update everything else
            posts[index] = { 
                ...updatedPost, 
                id: id,  // Keep original ID
                timestamp: posts[index].timestamp  // Keep original timestamp
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
            return true;
        }
        return false;
    }

    // 🗑️ Delete post
    deletePost(id) {
        const posts = this.getAllPosts();
        const filtered = posts.filter(p => p.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
        return true;
    }

    // 📤 Export to posts-data.js file
    exportToFile() {
        const posts = this.getAllPosts();
        
        // Create JavaScript file content (compatible with index.html)
        const fileContent = `// Posts Data - Auto-generated from Easy Post Editor
// Last updated: ${new Date().toLocaleString()}

window.POSTS_DATA = ${JSON.stringify(posts, null, 2)};
`;

        // Create download
        const blob = new Blob([fileContent], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'posts-data.js';
        a.click();
        URL.revokeObjectURL(url);
        
        return posts.length;
    }

    // 📊 Get stats
    getStats() {
        const posts = this.getAllPosts();
        return {
            total: posts.length,
            lastUpdated: posts[0]?.timestamp || 'No posts yet'
        };
    }
}

// Create global instance
const postsManager = new EasyPostsManager();
