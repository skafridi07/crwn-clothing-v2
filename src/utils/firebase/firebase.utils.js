import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxm8X4lPQ8puH5icFw-rldWQVNiJJO210",
  authDomain: "crwn-clothing-db-8fe05.firebaseapp.com",
  projectId: "crwn-clothing-db-8fe05",
  storageBucket: "crwn-clothing-db-8fe05.appspot.com",
  messagingSenderId: "445618457012",
  appId: "1:445618457012:web:10b47ee223527b3a42cae1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// We can have multiple different providers based on our needs that's why it's a class
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  //   console.log("userdocref", userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  //   console.log("user-snapshot", userSnapshot);
  console.log("exists", userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  //If usersnapshot already exists return this
  return userDocRef;
};
