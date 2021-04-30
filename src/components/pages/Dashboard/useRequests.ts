import * as React from 'react';
import { ExistingRequestType, FiltersType } from 'src/types';
import useFirestore from 'src/hooks/useFirestore';
import useUrlKeys from './useUrlKeys';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { useAppStore } from 'src/stores/appStore';
interface UseRequestsProps {
  appliedFilters: Partial<FiltersType>;
}

const useRequests = (props: UseRequestsProps) => {
  const { appliedFilters } = props;
  const [data, setData] = React.useState([] as ExistingRequestType[]);
  const [loading, setLoading] = React.useState(false);
  const { getRequests } = useFirestore();
  const urlKeys = useUrlKeys();
  const [app, appActions] = useAppStore();

  const filtersCount = Object.keys(pickBy(appliedFilters, identity)).length;

  const loadData = async (onFailure?: (e: any) => void) => {
    setLoading(true);
    setData([]);
    try {
      const requests = await (async () => {
        switch (urlKeys.tab.key) {
          case 'open_requests':
            return await getRequests({
              ...appliedFilters,
              requestStatus: 'open',
              sortBy: filtersCount ? undefined : {
                key: 'updatedAt',
                direction: 'desc',
              },
            });
          case 'closed_requests':
            return await getRequests({
              ...appliedFilters,
              requestStatus: 'closed',
              sortBy: filtersCount ? undefined : {
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
      setData(requests || []);
    } catch (e) {
      onFailure && onFailure(e);
    }
    setLoading(false);
  };

  return {
    data,
    loadData,
    loading,
  };
};

export default useRequests;
