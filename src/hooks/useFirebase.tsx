import { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAD4x1JRK-yzlTnFlZBP8QkYb-gh7lZp_s",
  authDomain: "care4living-f25bd.firebaseapp.com",
  databaseURL: "https://care4living-f25bd-default-rtdb.firebaseio.com/",
  projectId: "care4living-f25bd",
  storageBucket: "care4living-f25bd.appspot.com",
  messagingSenderId: 735333476786,
  appId: "1:735333476786:web:f16111d742874ca7679cab",
});

const AuthContext = createContext({} as any);

const provider = new firebase.auth.GoogleAuthProvider();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
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
