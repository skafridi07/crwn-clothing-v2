import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//We will use UserProvider to wrap the parent component which will
// give access to the children components the value attribute which manages state
// So that any children has direct access to the state
// We wrapped the <App /> inside index.js with <UserProvider></UserProvider>

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  //The moment this component mounts we will initialize onAuthStateChangedListener
  //to know if a user is logged in or not using useEffect
  useEffect(() => {
    //
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      console.log(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
