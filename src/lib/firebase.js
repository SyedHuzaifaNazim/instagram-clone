import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore , doc , setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import dynamic from "next/dynamic";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};






const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// const analytics = dynamic(() => import('firebase/analytics'), {
//   ssr: false,
// })();

const analyticsInstance = analytics.getAnalytics(app);

// export {  analyticsInstance };

export { auth, db, analytics };
