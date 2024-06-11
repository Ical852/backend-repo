import admin from "firebase-admin";
import firebase from "firebase/app";
import "firebase/auth";
const serviceAccount = require("../ebuddy-dc818-firebase-adminsdk-cosd6-0a97ad4559.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: "AIzaSyAufG9bBLVN2_-AVGEWoA44jVy5EVDjkhY",
  authDomain: "ebuddy-dc818.firebaseapp.com",
  projectId: "ebuddy-dc818",
  storageBucket: "ebuddy-dc818.appspot.com",
  messagingSenderId: "68729869590",
  appId: "1:68729869590:web:8165f307e1ef4119066c37",
  measurementId: "G-P6XM9Z80BN",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = admin.firestore();

export { admin, auth, db };
