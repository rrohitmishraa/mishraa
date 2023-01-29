import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkoyxY0ebJPFZCrbLcLFOzu-p9NNARZFk",
  authDomain: "mishraa-one-link.firebaseapp.com",
  projectId: "mishraa-one-link",
  storageBucket: "mishraa-one-link.appspot.com",
  messagingSenderId: "1006022517831",
  appId: "1:1006022517831:web:4e78eb948466b735ab3d62",
  measurementId: "G-RP544KXSMQ",
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
