/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import CancelIcon from '@material-ui/icons/Cancel';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import React from 'react';
import { useDashboardStore } from 'src/stores/dashboardStore';
import { useAppStore } from 'src/stores/appStore';
import { dashboardTabs } from './constants';
import { DashboardTab } from './types';

interface DashboardTabsProps {
  setTab: (newTab: string) => void;
  activeTab: DashboardTab;
}

const DashboardTabs: React.FC<DashboardTabsProps> = (props) => {
  const { setTab, activeTab } = props;
  const { requests, donations, links } = useDashboardStore();
  const { userInfo } = useAppStore();
  const { email, isAdmin } = userInfo || {};
  return (
    <AppBar position="static" color="default" variant="outlined">
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={activeTab.key}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, tabKey) => setTab(tabKey)}>

        <Tab label={dashboardTabs.open_requests.label}
          value={dashboardTabs.open_requests.key}
          icon={
            <Badge badgeContent={activeTab.key === dashboardTabs.open_requests.key ? requests?.length : 0}
              color="primary">
              <EnhancedEncryptionIcon />
            </Badge>
          }
        />

        {isAdmin ? <Tab
          label={dashboardTabs.donations.label}
          value={dashboardTabs.donations.key}
          icon={
            <Badge badgeContent={activeTab.key === dashboardTabs.donations.key ? donations?.length : 0} color="primary">
              <FavoriteIcon />
            </Badge>
          } /> : null}

        <Tab
          label={dashboardTabs.useful_links.label}
          value={dashboardTabs.useful_links.key}
          icon={
            <Badge badgeContent={activeTab.key === dashboardTabs.useful_links.key ? links?.length : 0} color="primary">
              <BeenhereIcon />
            </Badge>
          } />

        {email ?
          <Tab label={dashboardTabs.my_requests.label}
            value={dashboardTabs.my_requests.key}
            icon={
              <Badge badgeContent={activeTab.key === dashboardTabs.my_requests.key ? requests?.length : 0} color="primary">
                <NotificationsActiveIcon />
              </Badge>
            } /> : null}

        <Tab label={dashboardTabs.closed_requests.label}
          value={dashboardTabs.closed_requests.key}
          icon={
            <Badge badgeContent={activeTab.key === dashboardTabs.closed_requests.key ? requests?.length : 0} color="primary">
              <CancelIcon />
            </Badge>
          } />

      </Tabs>
    </AppBar>
  );
};

export default DashboardTabs;
