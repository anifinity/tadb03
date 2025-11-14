# 🔥 New Firebase SDK Setup

## ✅ Two Firebase Apps

**Firebase App 1** (Existing) → Views/Visits counter
**Firebase App 2** (New) → Posts data

---

## 📝 Step 1: Get New Firebase Config

1. Go to: https://console.firebase.google.com/
2. Create new project OR use existing
3. Go to Project Settings (gear icon)
4. Scroll to "Your apps"
5. Copy the config object

Should look like:
```javascript
{
    apiKey: "AIza...",
    authDomain: "project.firebaseapp.com",
    databaseURL: "https://project.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project.appspot.com",
    messagingSenderId: "123456",
    appId: "1:123456:web:abc123"
}
```

---

## 📝 Step 2: Update firebase-posts-config.js

Open `firebase-posts-config.js` and replace:

```javascript
const postsFirebaseConfig = {
    apiKey: "YOUR_NEW_API_KEY",  // ← Replace
    authDomain: "YOUR_NEW_PROJECT.firebaseapp.com",  // ← Replace
    databaseURL: "https://YOUR_NEW_PROJECT.firebaseio.com",  // ← Replace
    projectId: "YOUR_NEW_PROJECT",  // ← Replace
    storageBucket: "YOUR_NEW_PROJECT.appspot.com",  // ← Replace
    messagingSenderId: "YOUR_NEW_SENDER_ID",  // ← Replace
    appId: "YOUR_NEW_APP_ID"  // ← Replace
};
```

With your actual config!

---

## 📝 Step 3: Enable Realtime Database

1. In Firebase Console
2. Click "Realtime Database" (left menu)
3. Click "Create Database"
4. Choose location (closest to you)
5. Start in "Test mode" (for now)
6. Click "Enable"

---

## 📝 Step 4: Set Database Rules

In Realtime Database → Rules tab:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Click "Publish"

---

## 📝 Step 5: Upload Files

Upload to GitHub:
1. `firebase-posts-config.js` (with your config)
2. `firebase-posts-manager.js` (updated)
3. `index.html` (updated)
4. `post-editor.html` (updated)
5. `post.html` (updated)

---

## 🚀 Step 6: Test

1. Wait 2-3 minutes
2. Open Post Editor
3. Click "Sync to Firebase"
4. Should see: "✅ Synced X posts to Firebase"
5. Refresh homepage
6. Posts should appear! ✅

---

## 🔍 Check Console

Press F12 and look for:
- `✅ Firebase initialized and ready` (old Firebase - views)
- `✅ Posts Firebase initialized successfully` (new Firebase - posts)
- `✅ Posts Firebase detected!`
- `🔥 Posts Firebase is ready, loading posts...`

---

## 📋 Summary

**Old Firebase:**
- Still works for views/visits
- No changes needed

**New Firebase:**
- Separate project
- Only for posts data
- No conflicts!

---

**Provide your new Firebase config and I'll update the file!** 😊
