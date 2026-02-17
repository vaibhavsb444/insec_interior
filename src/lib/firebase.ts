import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB92eo-s-w4lx3faQ1wd7YEesQAM179JS4",
  authDomain: "insec-8863e.firebaseapp.com",
  projectId: "insec-8863e",
  storageBucket: "insec-8863e.firebasestorage.app",
  messagingSenderId: "396189148222",
  appId: "1:396189148222:web:a87e98e9792d375cd31d6f",
  measurementId: "G-ELBBXMMZW7"
};

// Initialize Firebase
// We check getApps().length to ensure we don't initialize twice during hot-reloading
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
const db = getFirestore(app);
// Analytics only works in the browser, so we add a check
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export const isFirebaseConfigured = () => !!firebaseConfig.apiKey;

// Helper to fetch data from Firestore
export async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  } catch (e) {
    console.warn(`Firebase: Could not fetch ${collectionName}`, e);
    return [];
  }
}

// Helper to add data (like contact forms) to Firestore
export async function addDocument(collectionName: string, data: Record<string, unknown>) {
  if (!db) {
    console.warn("Firebase not configured. Contact form data:", data);
    return null;
  }
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Firebase: Could not add document", e);
    return null;
  }
}

export { db, analytics };