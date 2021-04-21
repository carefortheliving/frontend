import { RequestType } from 'src/types';
import useFirebase from './useFirebase';
// import firebase from "firebase";
import { getCurrentTime } from 'src/utils/commonUtils';

const useFirestore = () => {
  const { db, auth } = useFirebase();
  
  const addRequest = async (request: RequestType) => {
    const requests = await db.collection("requests").add({
      ...request,
      createdAt: getCurrentTime(),
      updatedAt: getCurrentTime(),
    });
    return requests;
  };

  const updateRequest = async (docId: string, request: RequestType) => {
    const res = await db.collection("requests").doc(docId)?.update({
      ...request,
      updatedAt: getCurrentTime(),
    });
    return res;
  };

  const getRequests = async () => {
    const requests = await db.collection("requests").get();
    return requests;
  };

  const getRequest = async (docId: string) => {
    const request = await (await db.collection("requests").doc(docId).get()).data();
    return request;
  };

  return {
    getRequest,
    getRequests,
    addRequest,
    updateRequest,
  };
};

export default useFirestore;
