import firebase from 'firebase';
import { useAuth } from 'src/components/common/AuthProvider/View';

const useFirebase = () => {
	const db = firebase.firestore();
	const auth = useAuth();

	return {
		db,
		auth,
	};
};

export default useFirebase;
