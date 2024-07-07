import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref as fbRef } from "firebase/database";
import admin from "firebase-admin";

const firebase = useRuntimeConfig().firebase;
const serviceAccount = useRuntimeConfig().firebaseServiceAccount;

const firebaseConfig = {
  apiKey: firebase.apiKey,
  authDomain: firebase.authDomain,
  databaseURL: firebase.databaseURL,
  projectId: firebase.projectId,
  storageBucket: firebase.storageBucket,
  messagingSenderId: firebase.messagingSenderId,
  appId: firebase.appId,
};

const app = initializeApp(firebaseConfig);
export const fbAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: firebase.databaseURL,
});
export const auth = getAuth();
export const db = getDatabase(app);
export const gameStateDB = fbRef(db, "gameState");
