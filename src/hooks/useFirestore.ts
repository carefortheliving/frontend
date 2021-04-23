import { FiltersType, RequestType, UsefulLink } from 'src/types';
import useFirebase from './useFirebase';
// import firebase from "firebase";
import { getCurrentTime } from 'src/utils/commonUtils';

const useFirestore = () => {
  const { db } = useFirebase();
  
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

  const getRequests = async ({
    requesterEmail,
    requestStatus,
    requestCategory,
    patientDistrict,
    patientState,
  } : FiltersType) => {
    let requestsRef: any = await db.collection("requests")

    // refer: RequestType for keys
    if (requesterEmail) {
      requestsRef = await requestsRef.where('requesterEmail', '==', requesterEmail);
    }
    if (requestCategory) {
      requestsRef = await requestsRef.where('requestCategory.value', '==', requestCategory);
    }
    if (patientDistrict) {
      requestsRef = await requestsRef.where('patientDistrict.value', '==', patientDistrict);
    }
    if (patientState) {
      requestsRef = await requestsRef.where('patientState.value', '==', patientState);
    }
    if (requestStatus) {
      requestsRef = await requestsRef.where('requestStatus.value', '==', requestStatus);
    }
    const requests = await requestsRef.get();
    const ret = requests.docs?.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as (RequestType & { id: string })[];
    return ret;
  };

  const getRequest = async (docId: string) => {
    const request = await (await db.collection("requests").doc(docId).get()).data();
    return request;
  };

  const getUsefulLinks = async () => {
    const ret = await db.collection("usefulLinks").get();
    return ret.docs.map(el => el.data()) as unknown as UsefulLink[];
  };

  return {
    getRequest,
    getRequests,
    addRequest,
    updateRequest,
    getUsefulLinks,
  };
};

export default useFirestore;