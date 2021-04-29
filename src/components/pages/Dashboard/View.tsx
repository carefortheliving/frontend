/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  CircularProgress,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import CancelIcon from '@material-ui/icons/Cancel';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FilterList from '@material-ui/icons/FilterList';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { Alert, AlertTitle } from '@material-ui/lab';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseAnalytics, useAuth } from 'src/components/common/AuthProvider/View';
import { getViewRequestRoute } from 'src/components/common/RouterOutlet/routerUtils';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import {
  changeBackButton, changeTitle, useAppContext,
} from 'src/contexts/AppContext';
import useBreakpoint from 'src/hooks/useBreakpoint';
import { FiltersType, UsefulLink } from 'src/types';
import useUser from '../../../hooks/useUser';
import LinkCard from './LinkCard';
import { dashboardTabs, defaultFilters } from './constants';
import RequestFilters from './RequestFilters';
import { useStyles } from './styles';
import useRequests from './useRequests';
import useUrlKeys from './useUrlKeys';
import useUsefulLinks from './useUsefulLinks';
import RequestCard from './RequestCard';
import HeaderCarousel from './HeaderCarousel';

const Dashboard = () => {
  const { dispatch } = useAppContext();
  const classes = useStyles();
  const { user } = useAuth();
  const snackbar = useSnackbar();
  const [appliedFilters, setAppliedFilters] = useState(
    defaultFilters as Partial<FiltersType>,
  );
  const requests = useRequests({ appliedFilters });
  const usefulLinks = useUsefulLinks({});
  const history = useHistory();
  const urlKeys = useUrlKeys();
  const filtersCount = Object.keys(pickBy(appliedFilters, identity)).length;
  const isUpSm = useBreakpoint('sm');
  const { isAdmin } = useUser();
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

  const renderFilters = () => {
    return (
      <Grid item md={3}>
        {
          <div className={classes.filter_Container}>
            {isUpSm ? (
              <Typography
                component="h1"
                variant="h5"
                className={classes.filter_Heading}
              >
                Filters
              </Typography>
            ) : null}
            <div className={classes.filter}>
              <RequestFilters onChangeFilter={handleFilterChange} />
              {/* {getFilters={(keys)=>setFilterResults(keys)} } */}
            </div>
          </div>
        }
      </Grid>
    );
  };

  const renderFiltersCollapsed = () => {
    return (
      <Grid item md={12}>
        <Accordion className={classes.filterCollapsed}>
          <AccordionSummary
            expandIcon={<FilterList />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Badge badgeContent={filtersCount} color="primary">
              <Typography>Filters</Typography>
            </Badge>
          </AccordionSummary>
          <AccordionDetails>{renderFilters()}</AccordionDetails>
        </Accordion>
      </Grid>
    );
  };

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
                      return requests.data?.length ?
                        requests.data?.map((card) => <RequestCard key={card.id} data={card} onClick={handleCardClick} />) :
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
              <Badge badgeContent={urlKeys.tab.key === 'open_requests' ? requests.data?.length : 0}
                color="primary">
                <EnhancedEncryptionIcon />
              </Badge>
            }
          />

          {isAdmin /* TODO: */ ? <Tab
            label="Donors"
            value={dashboardTabs.donors.key}
            icon={
              <Badge badgeContent={urlKeys.tab.key === 'donors' ? 0 /* TODO: */ : 0} color="primary">
                <FavoriteIcon />
              </Badge>
            } /> : null}

          <Tab
            label="Useful links"
            value={dashboardTabs.useful_links.key}
            icon={
              <Badge badgeContent={urlKeys.tab.key === 'useful_links' ? usefulLinks?.data?.length : 0} color="primary">
                <BeenhereIcon />
              </Badge>
            } />

          {user?.email ?
            <Tab label="My Requests"
              value={dashboardTabs.my_requests.key}
              icon={
                <Badge badgeContent={urlKeys.tab.key === 'my_requests' ? requests.data?.length : 0} color="primary">
                  <NotificationsActiveIcon />
                </Badge>
              } /> : null}

          <Tab label="Closed Requests"
            value={dashboardTabs.closed_requests.key}
            icon={
              <Badge badgeContent={urlKeys.tab.key === 'closed_requests' ? requests.data?.length : 0} color="primary">
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
            isUpSm ?
              renderFilters() :
              renderFiltersCollapsed() :
            null}
          {renderContent()}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
