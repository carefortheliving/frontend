import * as React from 'react';
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import firebase from "firebase";
import useGenericRecoilState from './useGenericRecoilState';
import firebaseStore from './initialState'

const provider = new firebase.auth.GoogleAuthProvider();

////////////////////////
// Update the Firebase Credentials below
const config = {
  apiKey: "AIzaSyAD4x1JRK-yzlTnFlZBP8QkYb-gh7lZp_s",
  authDomain: "care4living-f25bd.firebaseapp.com",
  databaseURL: "https://care4living-f25bd-default-rtdb.firebaseio.com/",
  projectId: "care4living-f25bd",
  storageBucket: "care4living-f25bd.appspot.com",
  messagingSenderId: 735333476786,
  appId: "1:735333476786:web:f16111d742874ca7679cab",
};
//////////////////////////

const useFirebase = () => {
  const [state, setState]: [any, Function] = useGenericRecoilState<any>(firebaseStore);
  const { auth, db } = state;

  React.useEffect(() => {
    init();
  }, []);


  const init = () => {
    const value = isInitialized();
    if (!value) {
      app.initializeApp(config)
      setState((prev) => ({
          ...prev,
          auth: app.auth(),
          db: app.firestore()
        })
      );
    }
  };

  const logout = () => {
    return auth?.signOut();
  }

  const isInitialized = () => auth && Object.keys(auth).length > 0 ? true : false;

  const getAuthStatus = () => {
    if (auth?.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  const signInWithGoogle = async () => {
    return await auth?.signInWithPopup(provider);
  };

  return {
    logout,
    isInitialized,
    getAuthStatus,
    signInWithGoogle,
  };
};

export default useFirebase;
