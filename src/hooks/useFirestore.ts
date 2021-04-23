import { FiltersType, RequestType, UsefulLink } from 'types';
import { getCurrentTime } from 'utils/commonUtils';
import useFirebase from './useFirebase';
// import firebase from "firebase";

const useFirestore = () => {
  const { db } = useFirebase();

  const addRequest = async (request: RequestType) => {
    const requests = await db.collection('requests').add({
      ...request,
      createdAt: getCurrentTime(),
      updatedAt: getCurrentTime(),
    });
    return requests;
  };

  const updateRequest = async (docId: string, request: RequestType) => {
    const res = await db.collection('requests').doc(docId)?.update({
      ...request,
      updatedAt: getCurrentTime(),
    });
    return res;
  };

  const getRequests = async (args : FiltersType) => {
    const requestsRef: any = await db.collection('requests').where('requestStatus.value', 'in', args.requestStatus);
    // if(requestLocation.length>0)
    //     requestsRef = await requestsRef.where('patientDistrict' , 'in' , requestLocation )

    // if (requesterEmail) {
    //   requestsRef = await requestsRef.where('requesterEmail', '==', requesterEmail);
    // }
    // if (requestStatus) {
    //   requestsRef = await requestsRef.where('requestStatus.value', '==', requestStatus);
    // }
    const requests = await requestsRef.get();
    const ret = requests.docs?.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as (RequestType & { id: string })[];
    return ret;
  };

  const getRequest = async (docId: string) => {
    const request = await (await db.collection('requests').doc(docId).get()).data();
    return request;
  };

  const getUsefulLinks = async () => {
    const ret = await db.collection('usefulLinks').get();
    return ret.docs.map((el) => el.data()) as unknown as UsefulLink[];
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
