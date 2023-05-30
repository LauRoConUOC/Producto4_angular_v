importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCsppvQeivQsnzxSEqZJLuqlPuOCdiSsnM",
  authDomain: "appdev-producto-2.firebaseapp.com",
  databaseURL:
    "https://appdev-producto-2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "appdev-producto-2",
  storageBucket: "appdev-producto-2.appspot.com",
  messagingSenderId: "170869470701",
  appId: "1:170869470701:web:0e22afd08b72035311a3e4",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
