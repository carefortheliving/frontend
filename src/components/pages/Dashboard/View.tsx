/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  CircularProgress,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import CancelIcon from '@material-ui/icons/Cancel';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { UsefulLink } from 'src/types';
import { dashboardTabs } from './constants';
import HeaderCarousel from './HeaderCarousel';
import LinkCard from './LinkCard';
import useModel from './model';
import RequestCard from './RequestCard';
import RequestFilters from './RequestFilters';
import { useStyles } from './styles';
import useBreakpoint from 'src/hooks/useBreakpoint';

const Dashboard = () => {
  const classes = useStyles();
  const model = useModel();
  const isUpSm = useBreakpoint('sm');
  const {
    handleCardClick,
    handleFilterChange,
    handleFirebaseFailure,
    filtersCount,
    loading,
    isAdmin,
    email,
    urlKeys,
    usefulLinks,
    requests,
  } = model;

  const renderNoRequests = () => {
    return (
      <Container style={{ marginTop: '20px' }}>
        <Alert severity="info">
          <AlertTitle>No requests created yet</AlertTitle>
          Click on the <strong>Create Request</strong> button to get started!
        </Alert>
      </Container>
    );
  };

  const renderHeader = () => {
    return (
      <Container maxWidth="lg">
        <HeaderCarousel />
      </Container>
    );
  };

  const renderLinkCard = (data?: UsefulLink, index?: number) => {
    return (
      <Grid item key={`add-link-${index || '*'}`} xs={12} sm={6} md={4}>
        <LinkCard prefillData={data} onReloadRequested={() => usefulLinks.loadData(handleFirebaseFailure)} />
      </Grid>
    );
  };

  const renderContent = () => {
    return (
      <Grid item md={9}>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {loading ? (
              <Box
                style={{
                  width: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  margin: 'auto',
                }}
              >
                <CircularProgress
                  style={{ margin: 'auto', marginTop: '100px' }}
                />
              </Box>
            ) : (
                (() => {
                  switch (urlKeys.tab.key) {
                    case 'useful_links':
                      return (
                        <>
                          {usefulLinks?.data?.map((link, index) =>
                            renderLinkCard(link, index),
                          )}
                          {isAdmin ? renderLinkCard() : null}
                        </>
                      );
                    case 'donors':
                      return null;
                    case 'open_requests':
                    case 'closed_requests':
                    case 'my_requests':
                    default:
                      return requests?.length ?
                        requests?.map((card) => <RequestCard key={card.id} data={card} onClick={handleCardClick} />) :
                        renderNoRequests();
                  }
                })()
              )}
          </Grid>
        </Container>
      </Grid>
    );
  };

  const renderTabs = () => {
    return (
      <AppBar position="static" color="default" variant="outlined">
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={urlKeys.tab.key}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, tabKey) => urlKeys.setTab(tabKey)}>

          <Tab label="Open Requests"
            value={dashboardTabs.open_requests.key}
            icon={
              <Badge badgeContent={urlKeys.tab.key === 'open_requests' ? requests?.length : 0}
                color="primary">
                <EnhancedEncryptionIcon />
              </Badge>
            }
          />

          <Tab
            label="Donors"
            value={dashboardTabs.donors.key}
            icon={
              <Badge badgeContent={urlKeys.tab.key === 'donors' ? 0 /* TODO: */ : 0} color="primary">
                <FavoriteIcon />
              </Badge>
            } />

          <Tab
            label="Useful links"
            value={dashboardTabs.useful_links.key}
            icon={
              <Badge badgeContent={urlKeys.tab.key === 'useful_links' ? usefulLinks?.data?.length : 0} color="primary">
                <BeenhereIcon />
              </Badge>
            } />

          {email ?
            <Tab label="My Requests"
              value={dashboardTabs.my_requests.key}
              icon={
                <Badge badgeContent={urlKeys.tab.key === 'my_requests' ? requests?.length : 0} color="primary">
                  <NotificationsActiveIcon />
                </Badge>
              } /> : null}

          <Tab label="Closed Requests"
            value={dashboardTabs.closed_requests.key}
            icon={
              <Badge badgeContent={urlKeys.tab.key === 'closed_requests' ? requests?.length : 0} color="primary">
                <CancelIcon />
              </Badge>
            } />

        </Tabs>
      </AppBar>
    );
  };

  return (
    <>
      <div className={classes.heroContent}
        style={{
          padding: isUpSm ? '64px 0px 48px' : '40px 0px 20px',
        }}>{renderHeader()}</div>
      <Container>
        <Grid item sm={12}>
          {renderTabs()}
        </Grid>
        <Grid container spacing={4}>
          {urlKeys.tab.key === 'open_requests' ?
            <RequestFilters onChangeFilter={handleFilterChange} filtersCount={filtersCount} /> :
            null}
          {renderContent()}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
