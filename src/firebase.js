import { initializeApp, firebase } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBecvGc1hFnOwJFxHGKfd1c715Q1vrbnfA",
  authDomain: "chatting-server-7172d.firebaseapp.com",
  projectId: "chatting-server-7172d",
  storageBucket: "chatting-server-7172d.firebasestorage.app",
  messagingSenderId: "238543406629",
  appId: "G-NKF809RQC5",
  measurementId: "G-NKF809RQC5"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BI2dy2_2-WTCTq_ZjLvZvOc552Fd_huD4Zsiupbo8rom2WapSH8k4IZYL-w12JR8MmfJGNcZlkpLmW60TZ1LFjM", // Use your Firebase project's VAPID key
    });

    if (token) {
      console.log("Notification permission granted. Token:", token);
      return token; // Send this token to the backend
    } else {
      console.log("No registration token available.");
      return null;
    }
  } catch (error) {
    console.error("Error getting permission for notifications:", error);
  }
};

// Listen for Incoming Notifications
export const onForegroundNotification = (callback) => {
  onMessage(messaging, callback);
};

const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };