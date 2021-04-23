import firebase from 'firebase';
import { useAuth } from 'components/common/AuthProvider/View';

const useFirebase = () => {
  const db = firebase.firestore();
  // const auth = firebase.auth();
  const auth = useAuth();

  return {
    db,
    auth,
  };
};

export default useFirebase;
