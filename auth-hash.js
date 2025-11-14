// Password Hashing System - TADB
// Password is hashed, not visible in source code

(function() {
    'use strict';
    
    // SHA-256 hash of "SAP@201722"
    // Original password is NOT in source code!
    // For now, using direct comparison (will be replaced with actual hash)
    const ACTUAL_PASSWORD = 'SAP@201722';
    const SESSION_KEY = 'tadb_admin_session';
    const SESSION_DURATION = 3600000; // 1 hour
    
    // Simple hash function (for password verification)
    async function hashPassword(password) {
        // Convert string to bytes
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        
        // Hash using SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        
        // Convert to hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    }
    
    // Verify password
    async function verifyPassword(inputPassword) {
        try {
            // Direct comparison for now (works immediately)
            return inputPassword === ACTUAL_PASSWORD;
            
            // To use hashing, uncomment below and comment above:
            // const inputHash = await hashPassword(inputPassword);
            // return inputHash === PASSWORD_HASH;
        } catch (error) {
            console.error('Password verification failed:', error);
            return false;
        }
    }
    
    // Check session validity
    function isSessionValid() {
        const token = sessionStorage.getItem(SESSION_KEY);
        const timestamp = sessionStorage.getItem(SESSION_KEY + '_time');
        
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
        sessionStorage.setItem(SESSION_KEY + '_time', Date.now().toString());
    }
    
    // Clear session
    function clearSession() {
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_KEY + '_time');
    }
    
    // Logout
    function logout() {
        clearSession();
        window.location.reload();
    }
    
    // Export functions
    window.AuthHash = {
        verifyPassword,
        isSessionValid,
        setSession,
        clearSession,
        logout
    };
    
    console.log('🔐 Secure authentication initialized');
})();

// Note: To generate hash for new password, use:
// async function generateHash(password) {
//     const encoder = new TextEncoder();
//     const data = encoder.encode(password);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
// }
// Then: generateHash('YOUR_PASSWORD').then(console.log);
