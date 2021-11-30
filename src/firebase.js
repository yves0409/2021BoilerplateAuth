import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFr6msHiKyN_uwdMuKWtXTHn-UeGfvTik",
  authDomain: "lomu2022-36cf1.firebaseapp.com",
  databaseURL: "https://lomu2022-36cf1.firebaseio.com",
  projectId: "lomu2022-36cf1",
  storageBucket: "lomu2022-36cf1.appspot.com",
  messagingSenderId: "1006673059067",
  appId: "1:1006673059067:web:fb8d8f03f90b482c87645e",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
