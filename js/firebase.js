// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9zefP8P5jz7q-jUAyFIoN_nbW2qb9l3E",
  authDomain: "fir-bea2c.firebaseapp.com",
  databaseURL: "https://fir-bea2c-default-rtdb.firebaseio.com",
  projectId: "fir-bea2c",
  storageBucket: "fir-bea2c.appspot.com",
  messagingSenderId: "405453641956",
  appId: "1:405453641956:web:485cade770bdda47a934f1",
  measurementId: "G-L4RDSQCSLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


