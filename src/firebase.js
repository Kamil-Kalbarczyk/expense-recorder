import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAb6lqPQ-gC7GyeoNKxygYfEhfVkFIRha4",
  authDomain: "expenses-recorder-kk.firebaseapp.com",
  projectId: "expenses-recorder-kk",
  storageBucket: "expenses-recorder-kk.appspot.com",
  messagingSenderId: "334069271196",
  appId: "1:334069271196:web:dd9b0c8470c5048149bb59",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
