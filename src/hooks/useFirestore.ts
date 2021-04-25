import { FiltersType, RequestType, UsefulLink } from 'src/types';
import useFirebase from './useFirebase';
import { getCurrentTime } from 'src/utils/commonUtils';

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
		requesterEmail,
		requestStatus,
		requestCategory,
		patientDistrict,
		patientState,
	} : FiltersType) => {
		let requestsRef: any = db.collection('requests');
		if (requesterEmail) {
			requestsRef =
        requestsRef.where('requesterEmail', '==', requesterEmail);
		}
		if (requestCategory) {
			requestsRef =
        requestsRef.where('requestCategory.value', '==', requestCategory);
		}
		if (patientDistrict) {
			requestsRef =
        requestsRef.where('patientDistrict.value', '==', patientDistrict);
		}
		if (patientState) {
			requestsRef = requestsRef.where('patientState.value', '==', patientState);
		}
		if (requestStatus) {
			requestsRef =
        requestsRef.where('requestStatus.value', '==', requestStatus);
		}
		const requests = await requestsRef.get();
		const ret = requests.docs?.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as unknown as (RequestType & { id: string })[];
		return ret;
	};

	const getRequest = async (docId: string) => {
		const request = await (
			await db.collection('requests').doc(docId).get()
		).data();
		return request;
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
		getUsefulLinks,
		addUsefulLink,
		updateUsefulLink,
		isCurrentUserAdmin,
	};
};

export default useFirestore;
