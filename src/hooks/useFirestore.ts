import { DonationType, ExistingDonationType, ExistingRequestType, RequestType, UsefulLink } from 'src/types';
import useFirebase from './useFirebase';
import { getCurrentTime } from 'src/utils/commonUtils';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { defaultDonationsFilters, defaultRequestsFilters } from 'src/components/pages/Dashboard/constants';

const useFirestore = () => {
  const { db, auth } = useFirebase();

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

  const getRequests = async ({
    sortBy,
    requestStatus,
    ...unindexedFilters // to be indexed on demand in firebase
  } : Partial<typeof defaultRequestsFilters>) => {
    const {
      requesterEmail,
      requestCategory,
      patientDistrict,
      patientState,
      pageSize,
      pageIndex,
    } = unindexedFilters;
    let requestsRef = db.collection('requests');
    if (requesterEmail) {
      requestsRef =
        requestsRef.where('requesterEmail', '==', requesterEmail) as any;
    }
    if (requestCategory) {
      requestsRef =
        requestsRef.where('requestCategory.value', '==', requestCategory.value) as any;
    }
    if (patientDistrict) {
      requestsRef =
        requestsRef.where('patientDistrict.value', '==', patientDistrict.value) as any;
    }
    if (patientState) {
      requestsRef = requestsRef.where('patientState.value', '==', patientState.value) as any;
    }
    if (requestStatus) {
      requestsRef =
        requestsRef.where('requestStatus.value', '==', requestStatus.value) as any;
    }
    if (sortBy?.key) {
      requestsRef = requestsRef.orderBy(sortBy.key, sortBy.direction === 'desc' ? 'desc' : undefined) as any;
    }
    // TODO: postponing pagination to save db queries
    // if (pageIndex && pageSize) {
    //   const startAt = pageSize * (pageIndex - 1);
    //   const endAt = pageSize * pageIndex;
    //   requestsRef = requestsRef.startAt(startAt).endAt(endAt) as any;
    // }
    const requests = await requestsRef.get();
    const ret = requests.docs?.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as (ExistingRequestType)[];
    const filtersCount = Object.keys(pickBy(unindexedFilters, identity)).length;
    filtersCount && ret.sort((a, b) => b.createdAt - a.createdAt);
    return ret;
  };

  const getRequest = async (docId: string) => {
    const request = await (
      await db.collection('requests').doc(docId).get()
    ).data();
    return request;
  };

  const addDonation = async (donation: DonationType) => {
    const donations = await db.collection('donations').add({
      ...donation,
      createdAt: getCurrentTime(),
      updatedAt: getCurrentTime(),
    });
    return donations;
  };

  const updateDonation = async (docId: string, donation: DonationType) => {
    const res = await db.collection('donations').doc(docId)?.update({
      ...donation,
      updatedAt: getCurrentTime(),
    });
    return res;
  };

  const getDonations = async ({
    sortBy,
    donationStatus,
    ...unindexedFilters // to be indexed on demand in firebase
  } : Partial<typeof defaultDonationsFilters>) => {
    const {
      donorEmail,
      donationCategory,
      donorDistrict,
      donorState,
      pageSize,
      pageIndex,
    } = unindexedFilters;
    let requestsRef = db.collection('donations');
    if (donorEmail) {
      requestsRef =
        requestsRef.where('donorEmail', '==', donorEmail) as any;
    }
    if (donationCategory) {
      requestsRef =
        requestsRef.where('donationCategory.value', '==', donationCategory.value) as any;
    }
    if (donorDistrict) {
      requestsRef =
        requestsRef.where('donorDistrict.value', '==', donorDistrict.value) as any;
    }
    if (donorState) {
      requestsRef = requestsRef.where('donorState.value', '==', donorState.value) as any;
    }
    if (donationStatus) {
      requestsRef =
        requestsRef.where('donationStatus.value', '==', donationStatus.value) as any;
    }
    if (sortBy?.key) {
      requestsRef = requestsRef.orderBy(sortBy.key, sortBy.direction === 'desc' ? 'desc' : undefined) as any;
    }
    // TODO: postponing pagination to save db queries
    // if (pageIndex && pageSize) {
    //   const startAt = pageSize * (pageIndex - 1);
    //   const endAt = pageSize * pageIndex;
    //   requestsRef = requestsRef.startAt(startAt).endAt(endAt) as any;
    // }
    const requests = await requestsRef.get();
    const ret = requests.docs?.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as (ExistingDonationType)[];
    const filtersCount = Object.keys(pickBy(unindexedFilters, identity)).length;
    filtersCount && ret.sort((a, b) => b.createdAt - a.createdAt);
    return ret;
  };

  const getDonation = async (docId: string) => {
    const donation = await (
      await db.collection('donations').doc(docId).get()
    ).data();
    return donation;
  };

  const getUsefulLinks = async () => {
    const ret = await db.collection('usefulLinks').get();
    return ret.docs.map((el) => ({
      docId: el.id,
      ...el.data(),
    })) as unknown as UsefulLink[];
  };

  const addUsefulLink = async (data: UsefulLink) => {
    const requests = await db.collection('usefulLinks').add({
      ...data,
      createdAt: getCurrentTime(),
      updatedAt: getCurrentTime(),
    });
    return requests;
  };

  const updateUsefulLink = async (docId: string, data: UsefulLink) => {
    const res = await db.collection('usefulLinks').doc(docId)?.update({
      ...data,
      updatedAt: getCurrentTime(),
    });
    return res;
  };

  const isCurrentUserAdmin = async () => {
    if (!auth?.user?.email) return false;

    let requestsRef: any = await db.collection('users');
    requestsRef = await requestsRef.where('email', '==', auth?.user?.email);
    requestsRef = await requestsRef.where('role', '==', 'admin');
    const adminDocs = await requestsRef.get();
    return !!(adminDocs?.docs?.length);
  };

  return {
    getRequest,
    getRequests,
    addRequest,
    updateRequest,
    getDonation,
    getDonations,
    addDonation,
    updateDonation,
    getUsefulLinks,
    addUsefulLink,
    updateUsefulLink,
    isCurrentUserAdmin,
  };
};

export default useFirestore;
