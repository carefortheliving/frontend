import * as React from 'react';
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import firebase from "firebase";
import { useGenericState } from './useGenericState';
import { atom, selector, useRecoilState } from 'recoil';
import useGenericRecoilState from './useGenericRecoilState';

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

const firebaseStore = atom({
  key: 'firebase',
  default: {
    auth: undefined as firebase.auth.Auth | undefined,
    db: undefined as firebase.firestore.Firestore | undefined,
  },
  dangerouslyAllowMutability: true,
});

const useFirebase = () => {
  const [state, setState] = useGenericRecoilState(firebaseStore);
  const { auth, db } = state;

  React.useEffect(() => {
    init();
  }, []);


  const init = async () => {
    if (!(await isInitialized())) {
      app.initializeApp(config);
      setState({
        auth: app.auth(),
        db: app.firestore()
      });
    }
  };

  const logout = () => {
    return auth?.signOut();
  }

  const isInitialized = () => {
    return new Promise((resolve) => {
      auth?.onAuthStateChanged(resolve);
    });
  }

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
