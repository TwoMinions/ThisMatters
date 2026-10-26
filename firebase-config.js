export const firebaseConfig = {
  apiKey: "AIzaSyA1TubY23bDE5FoW5l9T72eQe4XJ_yCboA",
  authDomain: "thismatters-3f5e5.firebaseapp.com",
  projectId: "thismatters-3f5e5",
  storageBucket: "thismatters-3f5e5.firebasestorage.app",
  messagingSenderId: "157428559652",
  appId: "1:157428559652:web:040fc3ad5e978d211bcdb1",
  measurementId: "G-H6PDNLS156",
};

export const firebaseConfigured =
  Boolean(
    firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
  ) &&
  !Object.values(firebaseConfig).some((value) =>
    String(value).includes("YOUR_"),
  );
