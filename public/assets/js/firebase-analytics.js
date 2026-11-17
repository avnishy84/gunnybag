// Firebase Analytics — loaded via CDN compat scripts in each HTML page.
// This file initialises the app and starts Analytics page-view tracking.
// It must be loaded AFTER the two Firebase CDN compat <script> tags.

(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyBI2_4htYbi28Nuep5fvmtKfxMhTupyqVo",
    authDomain: "gunnybag-b5be8.firebaseapp.com",
    projectId: "gunnybag-b5be8",
    storageBucket: "gunnybag-b5be8.firebasestorage.app",
    messagingSenderId: "571944710517",
    appId: "1:571944710517:web:61b1c5947463c9d61a633c",
    measurementId: "G-0NDKQXNZ1G"
  };

  // Guard: don't double-initialise if another page loads this twice
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Analytics only works in a real browser with network access.
  // Skip silently during local development (localhost / 127.0.0.1).
  var isLocal = ["localhost", "127.0.0.1"].indexOf(window.location.hostname) !== -1;
  if (!isLocal && typeof firebase.analytics === "function") {
    firebase.analytics();
  }
})();
