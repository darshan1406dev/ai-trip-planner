// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGtJRWQwIbB9liMSYtDqzYJMIT8F2zlZ4",
  authDomain: "travel-planner-b1276.firebaseapp.com",
  projectId: "travel-planner-b1276",
  storageBucket: "travel-planner-b1276.firebasestorage.app",
  messagingSenderId: "158793986353",
  appId: "1:158793986353:web:5cc149329eb9f24b48c010",
  measurementId: "G-3E40X58H5J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);