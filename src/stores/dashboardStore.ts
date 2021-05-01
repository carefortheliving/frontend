import { useEffect } from 'react';
import { atom } from 'recoil';
import useUrlKeys from 'src/components/pages/Dashboard/useUrlKeys';
import useFirestore from 'src/hooks/useFirestore';
import useGenericRecoilState from 'src/hooks/useGenericRecoilState';
import { useAppStore } from 'src/stores/appStore';
import { ExistingRequestType, UsefulLink } from 'src/types';
import { usePaginationStore } from './paginationStore';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';

const dashboardStore = atom({
  key: 'dashboard',
  default: {
    requests: [] as ExistingRequestType[],
    requestsLoading: false,
    links: [] as UsefulLink[],
  },
});

export const useDashboardStore = () => {
  const [state, setState] = useGenericRecoilState(dashboardStore);
  const { getRequests } = useFirestore();
  const urlKeys = useUrlKeys();
  const [app, appActions] = useAppStore();
  const paginationRequests = usePaginationStore('dashboardRequestsFilters');
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
      let effectiveFiltersCount = paginationRequests.filtersCount;
      if (effectiveFilters.requestStatus) {
        effectiveFiltersCount = effectiveFiltersCount - 1;
      }
      if (effectiveFilters.sortBy) {
        effectiveFiltersCount = effectiveFiltersCount - 1;
      }
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

  // TODO: move logic here from dashboard model
  const loadLinks = async () => {
    setState({
      links: [],
    });
  };

  return {
    ...state,
    paginationRequests,
    loadRequests,
    loadLinks,
  };
};
