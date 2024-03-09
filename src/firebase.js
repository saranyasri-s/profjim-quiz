import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBG1YDW2RDiPI3tcvtZ8jGZMm6FcGGU50U",
  authDomain: "tweetx-23df5.firebaseapp.com",
  projectId: "tweetx-23df5",
  storageBucket: "tweetx-23df5.appspot.com",
  messagingSenderId: "736755758222",
  appId: "1:736755758222:web:ae666a0c99cc45553705df",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
