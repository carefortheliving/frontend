/* eslint-disable react-hooks/exhaustive-deps */
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';
import { getViewRequestRoute } from 'src/components/common/RouterOutlet/routerUtils';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import {
  changeBackButton, changeTitle, useAppContext,
} from 'src/contexts/AppContext';
import { FiltersType } from 'src/types';
import useUser from '../../../hooks/useUser';
import { defaultFilters } from './constants';
import useRequests from './useRequests';
import useUrlKeys from './useUrlKeys';
import useUsefulLinks from './useUsefulLinks';

const useModel = () => {
  const { dispatch } = useAppContext();
  const snackbar = useSnackbar();
  const [appliedFilters, setAppliedFilters] = useState(
    defaultFilters as Partial<FiltersType>,
  );
  const requests = useRequests({ appliedFilters });
  const usefulLinks = useUsefulLinks({});
  const history = useHistory();
  const urlKeys = useUrlKeys();
  const filtersCount = Object.keys(pickBy(appliedFilters, identity)).length;
  const { isAdmin, email } = useUser();
  const loading = requests.loading || usefulLinks.loading;

  useEffect(() => {
    firebaseAnalytics.logEvent('dashboard_page_visited');
    dispatch(changeBackButton(false));
    dispatch(changeTitle('Care for the Living'));
  }, []);

  useEffect(() => {
    resetFilters();
    if (urlKeys.tab.key === 'closed_requests' ||
      urlKeys.tab.key === 'open_requests' ||
      urlKeys.tab.key === 'my_requests') {
      requests.loadData(handleFirebaseFailure);
    }
    if (urlKeys.tab.key === 'useful_links') {
      usefulLinks.loadData(handleFirebaseFailure);
    }
  }, [urlKeys.tab.key]);

  useEffect(() => {
    requests.loadData(handleFirebaseFailure);
  }, [appliedFilters]);

  const handleFirebaseFailure = (e: any) => {
    if (isAdmin) {
      console.log({ e });
    }
    usefulLinks.loadFallbackData();
    snackbar.show(
        'error',
        `Data fetch failed due to huge traffic load.
        Meanwhile please use comment thread.`,
    );
  };

  const handleCardClick = (docId: string) => {
    history.push(getViewRequestRoute(docId));
  };

  const resetFilters = () => {
    handleFilterChange(defaultFilters);
  };

  const handleFilterChange = (updatedFilters: Partial<FiltersType>) => {
    setAppliedFilters({ ...appliedFilters, ...updatedFilters });
  };

  return {
    handleCardClick,
    resetFilters,
    handleFilterChange,
    handleFirebaseFailure,
    filtersCount,
    loading,
    isAdmin,
    email,
    urlKeys,
    usefulLinks,
    requests,
  };
};

export default useModel;
