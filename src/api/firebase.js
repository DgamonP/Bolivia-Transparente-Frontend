import firebase from "firebase";
 
const config = {
  apiKey: "AIzaSyCb2RE1ifVk5Atyy48Jgs0LIZx6H3wLBWs",
  authDomain: "ministerio-gob-app.firebaseapp.com",
  databaseURL: "https://ministerio-gob-app.firebaseio.com",
  storageBucket: "ministerio-gob-app.appspot.com"
};

firebase.initializeApp(config);