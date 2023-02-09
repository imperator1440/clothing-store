import { initializeApp } from 'firebase/app'; 
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBedtyfCeJe42JdXQ07Xx4oJkhkim40fcM",
  authDomain: "crwn-clothing-db-3c6cb.firebaseapp.com",
  projectId: "crwn-clothing-db-3c6cb",
  storageBucket: "crwn-clothing-db-3c6cb.appspot.com",
  messagingSenderId: "784622337269",
  appId: "1:784622337269:web:6bc99729d4727b149d19bc"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);