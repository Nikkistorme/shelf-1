import firebase from 'firebase';
import 'firebase/firestore';
import {
  VUE_APP_FIREBASE_API_KEY,
  VUE_APP_FIREBASE_AUTH_DOMAIN,
  VUE_APP_FIREBASE_DATABASE_URL,
  VUE_APP_FIREBASE_PROJECT_ID,
  VUE_APP_FIREBASE_STORAGE_BUCKET,
  VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  VUE_APP_FIREBASE_APP_ID,
  VUE_APP_FIREBASE_MEASUREMENT_ID } from '../config.js';

const config = {
  apiKey: VUE_APP_FIREBASE_API_KEY,
  authDomain: VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: VUE_APP_FIREBASE_DATABASE_URL,
  projectId: VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: VUE_APP_FIREBASE_APP_ID,
  measurementId: VUE_APP_FIREBASE_MEASUREMENT_ID
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

const usersCollection = db.collection('users');

export {
  db,
  auth,
  currentUser,
  usersCollection
}