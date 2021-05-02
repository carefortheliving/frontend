/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge
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
import { dashboardTabs } from './constants';

interface DashboardTabsProps {
  isAdmin: boolean;
  setTab: (newTab: string) => void;
  activeTabKey: string;
  email: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = (props) => {
  const { isAdmin, setTab, activeTabKey, email } = props;
  const dashboard = useDashboardStore();
  return (
    <AppBar position="static" color="default" variant="outlined">
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={activeTabKey}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, tabKey) => setTab(tabKey)}>

        <Tab label="Open Requests"
          value={dashboardTabs.open_requests.key}
          icon={
            <Badge badgeContent={activeTabKey === 'open_requests' ? requests?.length : 0}
              color="primary">
              <EnhancedEncryptionIcon />
            </Badge>
          }
        />

        {isAdmin ? <Tab
          label="Donors"
          value={dashboardTabs.donors.key}
          icon={
            <Badge badgeContent={activeTabKey === 'donors' ? 0 /* TODO: */ : 0} color="primary">
              <FavoriteIcon />
            </Badge>
          } /> : null}

        <Tab
          label="Useful links"
          value={dashboardTabs.useful_links.key}
          icon={
            <Badge badgeContent={activeTabKey === 'useful_links' ? usefulLinks?.length : 0} color="primary">
              <BeenhereIcon />
            </Badge>
          } />

        {email ?
          <Tab label="My Requests"
            value={dashboardTabs.my_requests.key}
            icon={
              <Badge badgeContent={activeTabKey === 'my_requests' ? requests?.length : 0} color="primary">
                <NotificationsActiveIcon />
              </Badge>
            } /> : null}

        <Tab label="Closed Requests"
          value={dashboardTabs.closed_requests.key}
          icon={
            <Badge badgeContent={activeTabKey === 'closed_requests' ? requests?.length : 0} color="primary">
              <CancelIcon />
            </Badge>
          } />

      </Tabs>
    </AppBar>
  );
};

export default DashboardTabs;
