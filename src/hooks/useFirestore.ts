import { FiltersType, RequestType, UsefulLink } from 'src/types';
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

  const getRequests = async ({
    
    requestStatus,
    requestStates,
    requestCities,
    requestCategories
  } : FiltersType) => {
    console.log(requestStates)
    // let requestsRef: any = await db.collection("requests")
    let requestsRef: any  = await db.collection("requests")

    if(requestStatus.length==1)
   requestsRef = (requestStatus[0]==="Active") ? await requestsRef.where('requestStatus.value', '==',  "open") : await requestsRef.where('requestStatus.value', '==',  "closed")
    if(requestStates.length==1)
        requestsRef = await requestsRef.where('patientState.value','==',requestStates[0])
    if(requestCities.length>0)
    {console.log({requestCities}) ;
      requestsRef = await requestsRef.where('patientDistrict.key','in',requestCities)}


    const requests = await requestsRef.get();

    const ret = requests.docs?.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as (RequestType & { id: string })[];
    console.log(ret)

  
    
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