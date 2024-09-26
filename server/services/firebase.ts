import serviceAccount from "./service-account.json";
import admin, { type ServiceAccount } from "firebase-admin";

const { firebaseAdminId, databaseURL } = useRuntimeConfig();

export const fbAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: databaseURL,
  databaseAuthVariableOverride: {
    uid: firebaseAdminId,
  },
});
export const db = fbAdmin.database();
export const gameStateDB = db.ref("gameState");
