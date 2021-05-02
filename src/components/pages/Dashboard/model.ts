/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';
import { getViewDonationRoute, getViewRequestRoute } from 'src/components/common/RouterOutlet/routerUtils';
import { useAppStore } from 'src/stores/appStore';
import useUrlKeys from './useUrlKeys';
import { useDashboardStore } from 'src/stores/dashboardStore';

const useModel = () => {
  const app = useAppStore();
  const history = useHistory();
  const urlKeys = useUrlKeys();
  const dashboard = useDashboardStore();

  const loading = dashboard.requestsLoading || dashboard.linksLoading;

  useEffect(() => {
    firebaseAnalytics.logEvent('dashboard_page_visited');
    app.setBackButton(false);
    app.setTitle('Care for the Living');
  }, []);

  useEffect(() => {
    dashboard.loadRequests();
  }, [dashboard.paginationRequests.appliedFilters]);

  useEffect(() => {
    dashboard.loadDonations();
  }, [dashboard.paginationDonations.appliedFilters]);

  useEffect(() => {
    switch (urlKeys.tab.key) {
      case 'open_requests':
        if (dashboard.paginationRequests.appliedFilters.requestStatus?.value === 'open') return;
        dashboard.paginationRequests.setFilters({
          ...dashboard.paginationRequests.defaultFilters,
          requestStatus: { label: 'Open', value: 'open' },
        });
        return;
      case 'closed_requests':
        if (dashboard.paginationRequests.appliedFilters.requestStatus?.value === 'closed') return;
        dashboard.paginationRequests.setFilters({
          ...dashboard.paginationRequests.defaultFilters,
          requestStatus: { label: 'Closed', value: 'closed' },
        });
        return;
      case 'my_requests':
        if (dashboard.paginationRequests.appliedFilters.requesterEmail) return;
        // if (app.userInfo?.email) {
        dashboard.paginationRequests.setFilters({
          ...dashboard.paginationRequests.defaultFilters,
          requesterEmail: app.userInfo?.email || 'zzzzzzzzz',
        });
        // }
        return;
      case 'useful_links':
        if (dashboard.links.length) return;
        dashboard.loadLinks();
        return;
      default:
        return;
    }
  }, [urlKeys.tab.key]);

  const handleRequestCardClick = (docId: string) => {
    history.push(getViewRequestRoute(docId));
  };

  const handleDonationCardClick = (docId: string) => {
    history.push(getViewDonationRoute(docId));
  };

  return {
    handleRequestCardClick,
    handleDonationCardClick,
    loading,
    isAdmin: app.userInfo?.isAdmin,
    email: app.userInfo?.email,
    activeTabKey: urlKeys.tab.key,
    setTab: urlKeys.setTab,
    usefulLinks: dashboard.links,
    loadLinks: dashboard.loadLinks,
    requests: dashboard.requests,
    donations: dashboard.donations,
  };
};

export default useModel;
