/**
 * Firebase Configuration for Posts
 * Separate Firebase app for posts data
 */

// Initialize secondary Firebase app for posts
(function() {
    'use strict';
    
    // NEW Firebase configuration for posts
    const postsFirebaseConfig = {
        apiKey: "AIzaSyCHwx1MPaOPJsuFgLUSE5bQIIFujLAhsXQ",
        authDomain: "tadb-c1405.firebaseapp.com",
        databaseURL: "https://tadb-c1405-default-rtdb.firebaseio.com",
        projectId: "tadb-c1405",
        storageBucket: "tadb-c1405.firebasestorage.app",
        messagingSenderId: "958035733254",
        appId: "1:958035733254:web:1c5d19a36df940f41bcc87",
        measurementId: "G-206YWQ2X6X"
    };
    
    // Initialize as secondary app
    try {
        window.postsFirebaseApp = firebase.initializeApp(postsFirebaseConfig, 'postsApp');
        window.postsFirebaseDB = window.postsFirebaseApp.database();
        window.postsFirebaseReady = true;
        console.log('✅ Posts Firebase initialized successfully');
    } catch (error) {
        console.error('❌ Posts Firebase initialization failed:', error);
        window.postsFirebaseReady = false;
    }
})();
