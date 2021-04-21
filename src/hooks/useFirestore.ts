import { RequestType } from 'src/types';
import useFirebase from './useFirebase';

const useFirestore = () => {
  const { db, auth } = useFirebase();
  
  const addRequest = async (request: RequestType) => {
    const requests = await db.collection("requests").add(request);
    return requests;
  };

  const getRequests = async () => {
    const requests = await db.collection("requests").get();
    return requests;
  };

  return {
    getRequests,
    addRequest,
  };
};

export default useFirestore;
