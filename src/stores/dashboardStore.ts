import { useEffect } from 'react';
import { atom } from 'recoil';
import useUrlKeys from 'src/components/pages/Dashboard/useUrlKeys';
import useFirestore from 'src/hooks/useFirestore';
import useGenericRecoilState from 'src/hooks/useGenericRecoilState';
import { useAppStore } from 'src/stores/appStore';
import { ExistingDonationType, ExistingRequestType, UsefulLink } from 'src/types';
import { usePaginationStore } from './paginationStore';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';

const dashboardStore = atom({
  key: 'dashboard',
  default: {
    requests: [] as ExistingRequestType[],
    requestsLoading: false,
    donations: [] as ExistingDonationType[],
    donationsLoading: false,
    links: [] as UsefulLink[],
    linksLoading: false,
  },
});

export const useDashboardStore = () => {
  const [state, setState] = useGenericRecoilState(dashboardStore);
  const { getRequests, getDonations, getUsefulLinks } = useFirestore();
  const urlKeys = useUrlKeys();
  const app = useAppStore();
  const paginationRequests = usePaginationStore('dashboardRequestsFilters');
  const paginationDonations = usePaginationStore('dashboardDonationsFilters');
  const snackbar = useSnackbar();

  useEffect(() => {
    // DANGER!
    // Stores can't have effects!
  }, []);

  const handleFirebaseFailure = (e: any) => {
    if (app.userInfo?.isAdmin) {
      console.log({ e });
    }
    // usefulLinks.loadFallbackData(); // TODO:
    snackbar.show(
        'error',
        `Data fetch failed due to huge traffic load.
        Meanwhile please use comment thread.`,
    );
  };

  const loadRequests = async () => {
    setState({
      requests: [],
      requestsLoading: true,
    });
    try {
      const effectiveFilters = { ...paginationRequests.appliedFilters };

      /** Firebase indexing works only for manually indexed filters,
       * so, making sure sortBy is sent only when the indexing is present.
      */
      const effectiveFiltersCount = paginationRequests.getFiltersCount(['requestStatus', 'sortBy', 'pageSize', 'pageIndex']);
      if (effectiveFiltersCount > 0) {
        effectiveFilters.sortBy = undefined;
      }

      const requests = await getRequests(effectiveFilters);
      setState({
        requests: requests || [],
      });
    } catch (e) {
      handleFirebaseFailure(e);
    }
    setState({
      requestsLoading: false,
    });
  };

  const loadDonations = async () => {
    setState({
      donations: [],
      donationsLoading: true,
    });
    try {
      const effectiveFilters = { ...paginationDonations.appliedFilters };

      /** Firebase indexing works only for manually indexed filters,
       * so, making sure sortBy is sent only when the indexing is present.
      */
      const effectiveFiltersCount = paginationDonations.getFiltersCount(['donationStatus', 'sortBy', 'pageSize', 'pageIndex']);
      if (effectiveFiltersCount > 0) {
        effectiveFilters.sortBy = undefined;
      }

      const donations = await getDonations(effectiveFilters);
      setState({
        donations: donations || [],
      });
    } catch (e) {
      handleFirebaseFailure(e);
    }
    setState({
      donationsLoading: false,
    });
  };

  const loadLinks = async () => {
    setState({
      links: [],
      linksLoading: true,
    });
    try {
      const links = await getUsefulLinks();
      setState({
        links: links || [],
      });
    } catch (e) {
      handleFirebaseFailure(e);
    }
    setState({
      linksLoading: false,
    });
  };

  return {
    ...state,
    loadRequests,
    paginationRequests,
    loadDonations,
    paginationDonations,
    loadLinks,
  };
};
