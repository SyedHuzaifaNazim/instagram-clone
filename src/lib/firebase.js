import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import dynamic from "next/dynamic";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };



const firebaseConfig = {
  apiKey: "AIzaSyDAtEhyKjjOq0LIJp9LdyDHuNhpUE8stqM",
  authDomain: "instagramclone-50ea1.firebaseapp.com",
  projectId: "instagramclone-50ea1",
  storageBucket: "instagramclone-50ea1.appspot.com",
  messagingSenderId: "392623062530",
  appId: "1:392623062530:web:b548b287591e0362d3f11b",
  measurementId: "G-GQFQL5ZNF6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

const analytics = dynamic(() => import('firebase/analytics'), {
  ssr: false,
})();

const analyticsInstance = analytics.getAnalytics(app);

export { auth, db, analyticsInstance };

// export { auth, db, analytics };
