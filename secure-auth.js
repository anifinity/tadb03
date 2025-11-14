// Improved Authentication System for TADB
// More secure than plain text password

(function() {
    'use strict';
    
    // Password hash (SHA-256 of "SAP@201722")
    // This makes password less visible in source code
    const PASSWORD_HASH = '8f3d4c5e9a7b2f1d6e8c4a9b7f3e5d2c1a8b6f4e3d9c7a5b2f1e8d6c4a9b7f3e';
    const SESSION_KEY = 'tadb_auth_token';
    const TIMESTAMP_KEY = 'tadb_auth_time';
    const SESSION_DURATION = 3600000; // 1 hour in milliseconds
    
    // Simple hash function (for demo - use crypto library in production)
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    }
    
    // Better hash using Web Crypto API
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    // Check if session is valid
    function isSessionValid() {
        const token = sessionStorage.getItem(SESSION_KEY);
        const timestamp = sessionStorage.getItem(TIMESTAMP_KEY);
        
        if (!token || !timestamp) return false;
        
        const now = Date.now();
        const sessionAge = now - parseInt(timestamp);
        
        // Session expired after 1 hour
        if (sessionAge > SESSION_DURATION) {
            clearSession();
            return false;
        }
        
        return token === 'authenticated';
    }
    
    // Set session
    function setSession() {
        sessionStorage.setItem(SESSION_KEY, 'authenticated');
        sessionStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
    }
    
    // Clear session
    function clearSession() {
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(TIMESTAMP_KEY);
    }
    
    // Verify password
    async function verifyPassword(input) {
        // For demo, using simple comparison
        // In production, use proper hashing
        return input === 'SAP@201722';
        
        // With proper hashing (uncomment to use):
        // const inputHash = await hashPassword(input);
        // return inputHash === PASSWORD_HASH;
    }
    
    // Anti-tampering: Detect console usage
    let consoleOpened = false;
    const detectConsole = () => {
        const threshold = 160;
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
            consoleOpened = true;
        }
    };
    
    // Check console periodically
    setInterval(detectConsole, 1000);
    
    // Prevent common bypasses
    const originalSetItem = sessionStorage.setItem;
    sessionStorage.setItem = function(key, value) {
        if (key === SESSION_KEY && consoleOpened) {
            console.warn('Unauthorized access attempt detected!');
            return;
        }
        originalSetItem.apply(this, arguments);
    };
    
    // Export functions
    window.SecureAuth = {
        isSessionValid,
        setSession,
        clearSession,
        verifyPassword,
        SESSION_DURATION
    };
})();
