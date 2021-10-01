import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCtRo8nt09xHbsU0i4oWj6F89scPFBRmbE",
  authDomain: "ecommerce-store-6f2ed.firebaseapp.com",
  projectId: "ecommerce-store-6f2ed",
  storageBucket: "ecommerce-store-6f2ed.appspot.com",
  messagingSenderId: "883067791554",
  appId: "1:883067791554:web:ab632e80939a65b9e1335b"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 

  export default firebase;