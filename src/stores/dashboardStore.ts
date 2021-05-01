import { useEffect } from 'react';
import { atom } from 'recoil';
import useUrlKeys from 'src/components/pages/Dashboard/useUrlKeys';
import useFirestore from 'src/hooks/useFirestore';
import useGenericRecoilState from 'src/hooks/useGenericRecoilState';
import { useAppStore } from 'src/stores/appStore';
import { ExistingRequestType, FiltersType, UsefulLink } from 'src/types';
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
    // Should never have to do anything here!
  }, []);

  useEffect(() => {
    loadRequests();
  }, [paginationRequests.appliedFilters]);

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

  const setRequestsFilters = (requestsFilters: Partial<FiltersType>) => {
    paginationRequests.setFilters(requestsFilters);
  };

  const resetRequestsFilters = () => {
    paginationRequests.resetFilters();
  };

  const loadRequests = async () => {
    setState({
      requests: [],
      requestsLoading: true,
    });
    try {
      const requests = await (async () => {
        switch (urlKeys.tab.key) {
          case 'open_requests':
            return await getRequests({
              ...paginationRequests.appliedFilters,
              requestStatus: 'open',
              sortBy: paginationRequests.filtersCount ? undefined : {
                key: 'updatedAt',
                direction: 'desc',
              },
            });
          case 'closed_requests':
            return await getRequests({
              ...paginationRequests.appliedFilters,
              requestStatus: 'closed',
              sortBy: paginationRequests.filtersCount ? undefined : {
                key: 'updatedAt',
                direction: 'desc',
              },
            });
          case 'my_requests':
            return (
              app.userInfo?.email &&
              (await getRequests({
                requesterEmail: app.userInfo?.email,
              }))
            );
          default:
            return;
        }
      })();
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
    setRequestsFilters,
    resetRequestsFilters,
  };
};
