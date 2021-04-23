import {
  useState, useEffect, useContext, createContext,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import config from 'src/config';

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAoYq1sjF3LDHN6igw2PMb24aLerkiK3Is',
  authDomain: 'carefortheliving-bca71.firebaseapp.com',
  projectId: 'carefortheliving-bca71',
  storageBucket: 'carefortheliving-bca71.appspot.com',
  messagingSenderId: '928599786532',
  appId: '1:928599786532:web:37cc1825a132a755c204b1',
  measurementId: 'G-VQBEB3W0JD',
});

const AuthContext = createContext({} as any);

const provider = new firebase.auth.GoogleAuthProvider();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(AuthContext) as {
    user: any;
    signInWithGoogle: () => Promise<void>,
    isAuthenticating: boolean,
    logout: () => Promise<void>,
  };

// Provider hook that creates auth object and handles state
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({} as any);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const signInWithGoogle = async () => await firebase.auth().signInWithPopup(provider);

  const logout = () => firebase
    .auth()
    .signOut()
    .then(() => {
      setUser(null);
    });

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
