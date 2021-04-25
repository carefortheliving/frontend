import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import config from 'src/config';

// Initialize Firebase
firebase.initializeApp({
  apiKey: config.REACT_APP_FIREBASE_APIKEY,
  authDomain: config.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: config.REACT_APP_FIREBASE_DATABASEURL,
  projectId: config.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: config.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: config.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: config.REACT_APP_FIREBASE_APPID,
});

const AuthContext = createContext({} as any);

const provider = new firebase.auth.GoogleAuthProvider();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext) as {
    user: any;
    signInWithGoogle: () => Promise<void>,
    isAuthenticating: boolean,
    logout: () => Promise<void>,
  };
};

// Provider hook that creates auth object and handles state
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({} as any);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const signInWithGoogle = async () => {
    return await firebase.auth().signInWithPopup(provider);
  };

  const logout = () => {
    return firebase
        .auth()
        .signOut()
        .then(() => {
          setUser(null);
        });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticating(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const values = {
    user,
    signInWithGoogle,
    isAuthenticating,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
