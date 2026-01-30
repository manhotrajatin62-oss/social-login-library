import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1dUxfqT_RfSlSYLQH4bQgucsB0mYNMHg",
  authDomain: "social-login-6210a.firebaseapp.com",
  projectId: "social-login-6210a",
  storageBucket: "social-login-6210a.firebasestorage.app",
  messagingSenderId: "972118721580",
  appId: "1:972118721580:web:123ba93df27e9c4987fd89"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

// github - https://social-login-6210a.firebaseapp.com/__/auth/handler