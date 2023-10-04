import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // getting document and setting document data

const firebaseConfig = {
  apiKey: 'AIzaSyB16AxaxBzW4-o5QrHKUegMewdzVkb6qS0',
  authDomain: 'crwn-clothing-92b3b.firebaseapp.com',
  projectId: 'crwn-clothing-92b3b',
  storageBucket: 'crwn-clothing-92b3b.appspot.com',
  messagingSenderId: '1046634022665',
  appId: '1:1046634022665:web:a3fc386af044b7bf7035d8',
  measurementId: 'G-WP0F0PH90C',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); // Its essentially a class, we want to create multiple providers, hence we are using new.

//It will prompt user to select account
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth(); // getAuth is a singleton object

export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('Error creating the user', error.message);
    }
    return userDocRef;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
