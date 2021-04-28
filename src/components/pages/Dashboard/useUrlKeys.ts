import * as React from 'react';
import { DashboardTab } from './types';
import { dashboardTabs } from './constants';
import { useHistory } from 'react-router-dom';
import { getUrlKey } from '../../../utils/commonUtils';

const useUrlKeys = () => {
  const [tab, setTab] = React.useState(dashboardTabs.open_requests as DashboardTab);
  const history = useHistory();

  React.useEffect(() => {
    const tabKey = getUrlKey('tab');
    if (tabKey) {
      if (Object.keys(dashboardTabs).indexOf(tabKey) === -1) {
        handleTabChange(dashboardTabs.open_requests.key);
      } else {
        setTab(dashboardTabs[tabKey]);
      }
    }
  }, [getUrlKey('tab')]);

  const handleTabChange = (newValue: string) => {
    const currentUrlParams = new URLSearchParams(location.search);
    currentUrlParams.set('tab', newValue?.toString());
    history.push({
      pathname: location.pathname,
      search: '?' + currentUrlParams.toString(),
    });
  };

  return {
    tab,
    setTab: handleTabChange,
  };
};

export default useUrlKeys;
