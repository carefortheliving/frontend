import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { atom } from 'recoil';
import { defaultFilters } from 'src/components/pages/Dashboard/constants';
import useUrlKeys from 'src/components/pages/Dashboard/useUrlKeys';
import useFirestore from 'src/hooks/useFirestore';
import useGenericRecoilState from 'src/hooks/useGenericRecoilState';
import { useAppStore } from 'src/stores/appStore';
import { ExistingRequestType, FiltersType, UsefulLink } from 'src/types';

const dashboardStore = atom({
  key: 'firebase',
  default: {
    requests: [] as ExistingRequestType[],
    requestsFilters: defaultFilters as Partial<FiltersType>,
    requestsLoading: false,
    links: [] as UsefulLink[],
  },
});

export const useDashboardStore = () => {
  const [state, setState] = useGenericRecoilState(dashboardStore);
  const { getRequests } = useFirestore();
  const urlKeys = useUrlKeys();
  const [app, appActions] = useAppStore();

  const requestsFiltersCount = Object.keys(pickBy(state.requestsFilters, identity)).length;
  const setRequestsFilters = (requestsFilters: Partial<FiltersType>) => {
    const valOrUpdated = (state) => ({
      requestsFilters: {
        ...state.requestsFilters,
        ...requestsFilters,
      },
    });
    setState(valOrUpdated as any);
  };

  const resetRequestsFilters = () => {
    const valOrUpdated = (state) => ({
      requestsFilters: {
        ...state.requestsFilters,
        ...defaultFilters,
      },
    });
    setState(valOrUpdated as any);
  };

  const loadRequests = async (onFailure?: (e: any) => void) => {
    setState({
      requests: [],
      requestsLoading: true,
    });
    try {
      const requests = await (async () => {
        switch (urlKeys.tab.key) {
          case 'open_requests':
            return await getRequests({
              ...state.requestsFilters,
              requestStatus: 'open',
              sortBy: requestsFiltersCount ? undefined : {
                key: 'updatedAt',
                direction: 'desc',
              },
            });
          case 'closed_requests':
            return await getRequests({
              ...state.requestsFilters,
              requestStatus: 'closed',
              sortBy: requestsFiltersCount ? undefined : {
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
      onFailure && onFailure(e);
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
    requestsFiltersCount,
    loadRequests,
    loadLinks,
    setRequestsFilters,
    resetRequestsFilters,
  };
};
