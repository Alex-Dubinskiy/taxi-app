// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp_zcaZlii1LmRDKzbwNDZJ1IEdJSEtfk",
  authDomain: "taxiapp-bb6b1.firebaseapp.com",
  projectId: "taxiapp-bb6b1",
  storageBucket: "taxiapp-bb6b1.appspot.com",
  messagingSenderId: "592347701869",
  appId: "1:592347701869:web:86c1ed0b827e8656799564",
  databaseURL: "https://taxiapp-bb6b1-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const database = getDatabase(app)
export default app;