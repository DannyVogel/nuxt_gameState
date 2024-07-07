import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import serviceAccount from "./service-account.json";
import admin, { type ServiceAccount } from "firebase-admin";

const firebase = useRuntimeConfig().firebase;
const adminId = useRuntimeConfig().firebaseAdminId;

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
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: firebase.databaseURL,
  databaseAuthVariableOverride: {
    uid: adminId,
  },
});
export const auth = getAuth();
export const db = fbAdmin.database();
export const gameStateDB = db.ref("gameState");
