import admin, { type ServiceAccount } from "firebase-admin";

const { firebaseAdminId, databaseURL, googleApplicationCredentials } =
  useRuntimeConfig();

export const fbAdmin = admin.initializeApp({
  credential: admin.credential.cert(
    googleApplicationCredentials as ServiceAccount
  ),
  databaseURL: databaseURL,
  databaseAuthVariableOverride: {
    uid: firebaseAdminId,
  },
});
export const db = fbAdmin.database();
export const gameStateDB = db.ref("gameState");
