/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';
import { getViewRequestRoute } from 'src/components/common/RouterOutlet/routerUtils';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import { useAppStore } from 'src/stores/appStore';
import { FiltersType } from 'src/types';
import useUrlKeys from './useUrlKeys';
import useUsefulLinks from './useUsefulLinks';
import { useDashboardStore } from 'src/stores/dashboardStore';

const useModel = () => {
  const [app, appActions] = useAppStore();
  const snackbar = useSnackbar();
  const usefulLinks = useUsefulLinks({});
  const history = useHistory();
  const urlKeys = useUrlKeys();
  const dashboard = useDashboardStore();

  const loading = dashboard.requestsLoading || usefulLinks.loading;

  useEffect(() => {
    firebaseAnalytics.logEvent('dashboard_page_visited');
    appActions.setBackButton(false);
    appActions.setTitle('Care for the Living');
  }, []);

  useEffect(() => {
    resetFilters();
    if (urlKeys.tab.key === 'closed_requests' ||
      urlKeys.tab.key === 'open_requests' ||
      urlKeys.tab.key === 'my_requests') {
      dashboard.loadRequests(handleFirebaseFailure);
    }
    if (urlKeys.tab.key === 'useful_links') {
      usefulLinks.loadData(handleFirebaseFailure);
    }
  }, [urlKeys.tab.key]);

  useEffect(() => {
    dashboard.loadRequests(handleFirebaseFailure);
  }, [dashboard.requestsFilters]);

  const handleFirebaseFailure = (e: any) => {
    if (app.userInfo?.isAdmin) {
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
    dashboard.resetRequestsFilters();
  };

  const handleFilterChange = (updatedFilters: Partial<FiltersType>) => {
    dashboard.setRequestsFilters(updatedFilters);
  };

  return {
    handleCardClick,
    resetFilters,
    handleFilterChange,
    handleFirebaseFailure,
    filtersCount: dashboard.requestsFiltersCount,
    loading,
    isAdmin: app.userInfo?.isAdmin,
    email: app.userInfo?.email,
    urlKeys,
    usefulLinks,
    requests: dashboard.requests,
  };
};

export default useModel;
