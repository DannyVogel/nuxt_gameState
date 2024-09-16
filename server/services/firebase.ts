import serviceAccount from "./service-account.json";
import admin, { type ServiceAccount } from "firebase-admin";

const firebase = useRuntimeConfig().firebase;
const adminId = useRuntimeConfig().firebaseAdminId;

export const fbAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: firebase.databaseURL,
  databaseAuthVariableOverride: {
    uid: adminId,
  },
});
export const db = fbAdmin.database();
export const gameStateDB = db.ref("gameState");
