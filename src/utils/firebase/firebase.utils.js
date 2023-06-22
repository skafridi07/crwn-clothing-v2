import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  getDocFromServer,
} from "firebase/firestore";

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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "Categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  //If usersnapshot already exists return this
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//It will call our callback whenever auth changes, for example when a user signs-in, singn-up or out
// This is an open listener which means the moment we set it it will wait for changes in auth
// But we have to make it stop listening after we run our callback to avoid memory leaks when
// a component is unmounted
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
