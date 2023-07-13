import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHr-7bJfCZzlMM3I0hBeijIvOPXQWXPEQ",
  authDomain: "music-75ac2.firebaseapp.com",
  projectId: "music-75ac2",
  storageBucket: "music-75ac2.appspot.com",
  appId: "1:208562715375:web:b92165449d91211300391a",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection("users");

export { auth, db, usersCollection };
