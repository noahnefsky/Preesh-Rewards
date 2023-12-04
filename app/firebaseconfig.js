// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "auth-domain",
  databaseURL: "db-url",
  projectId: "project-id",
  storageBucket: "storage-bucket",
  messagingSenderId: "messaging-sender-id",
  appId: "app-id",
  measurementId: "measurement-id"
};

var id = "";

const setId = (newId) => {
  id = newId;
};

const app = firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export { firebase, id, setId }