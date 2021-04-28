import * as React from 'react';
import { DashboardTab } from './types';
import { dashboardTabs } from './constants';
import { getUrlKey } from '../../../utils/commonUtils';

const useUrlKeys = () => {
  const [tab, setTab] = React.useState(dashboardTabs.open_requests as DashboardTab);

  React.useEffect(() => {
    if (getUrlKey('tab')) {
      setTab(dashboardTabs[getUrlKey('tab')]);
    }
  }, [getUrlKey('tab')]);

  return {
    tab,
  };
};

export default useUrlKeys;
