import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref as fbRef } from "firebase/database";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = useRuntimeConfig().public.firebase;
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getDatabase(app);
  const gameStateDB = fbRef(db, "gameState");
  return {
    provide: {
      auth,
      db,
      gameStateDB,
    },
  };
});
