import { atom } from 'recoil';
import "firebase/auth";
import "firebase/firebase-firestore";
import firebase from "firebase";

const firebaseStore = atom({
  key: 'firebase',
  default: {
    auth: undefined as firebase.auth.Auth | undefined,
    db: undefined as firebase.firestore.Firestore | undefined,
  },
  dangerouslyAllowMutability: true,
})

export default firebaseStore;