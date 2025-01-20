import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBecvGc1hFnOwJFxHGKfd1c715Q1vrbnfA",
  authDomain: "chatting-server-7172d.firebaseapp.com",
  projectId: "chatting-server-7172d",
  storageBucket: "chatting-server-7172d.firebasestorage.app",
  messagingSenderId: "238543406629",
  appId: "G-NKF809RQC5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };