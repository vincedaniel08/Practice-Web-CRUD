import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBVx3ayV0R-cPymzrB5CGC5O_KUNy7Kbtg",
    authDomain: "practice-crud-42dca.firebaseapp.com",
    projectId: "practice-crud-42dca",
    storageBucket: "practice-crud-42dca.appspot.com",
    messagingSenderId: "306544576012",
    appId: "1:306544576012:web:14a4125caa2949c7ded029",
    measurementId: "G-JJTSCYE9R7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 

  export default firebase;