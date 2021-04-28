/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  CircularProgress,
  Tooltip,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PanToolIcon from '@material-ui/icons/PanTool';
import FilterList from '@material-ui/icons/FilterList';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/components/common/AuthProvider/View';
import { getViewRequestRoute } from 'src/components/common/RouterOutlet/routerUtils';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import useBreakpoint from 'src/hooks/useBreakpoint';
import useFirestore from 'src/hooks/useFirestore';
import { FiltersType, RequestType, UsefulLink } from 'src/types';
import { parseTime } from 'src/utils/commonUtils';
import useUser from '../../../hooks/useUser';
import AddEditLinkCard from './AddEditLinkCard';
import RequestFilters from './RequestFilters';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import {
  useAppContext,
  changeTitle,
  changeBackButton,
} from 'src/contexts/AppContext';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CancelIcon from '@material-ui/icons/Cancel';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';
import { defaultUsefulLinks } from './constants';
import { useStyles } from './styles';
import useUrlKeys from './useUrlKeys';
import { dashboardTabs } from './constants';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Dashboard = () => {
  const { dispatch } = useAppContext();
  const classes = useStyles();
  const { user } = useAuth();
  const { getRequests, getUsefulLinks } = useFirestore();
  const snackbar = useSnackbar();
  const [requests, setRequests] = useState(
    [] as (RequestType & { id: string })[],
  );
  const [usefulLinks, setUsefulLinks] = useState([] as UsefulLink[]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const urlKeys = useUrlKeys();

  const defaultFilters = {
    patientDistrict: undefined,
    patientState: undefined,
    requestCategory: undefined,
    requestStatus: undefined,
    requesterEmail: undefined,
  };
  const [appliedFilters, setAppliedFilters] = useState(
    defaultFilters as Partial<FiltersType>,
  );
  const filtersCount = Object.keys(pickBy(appliedFilters, identity)).length;
  const isUpSm = useBreakpoint('sm');
  const { isAdmin } = useUser();

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
      loadRequests();
    }
    if (urlKeys.tab.key === 'useful_links') {
      loadLinks();
    }
  }, [urlKeys.tab.key]);

  useEffect(() => {
    loadRequests();
  }, [appliedFilters]);

  const loadLinks = async () => {
    setLoading(true);
    const links = await getUsefulLinks();
    setLoading(false);
    setUsefulLinks(links);
  };

  const loadRequests = async () => {
    setLoading(true);
    setRequests([]);
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
              user?.email &&
              (await getRequests({
                requesterEmail: user?.email,
              }))
            );
          default:
            return;
        }
      })();
      setRequests(requests);
    } catch (e) {
      handleFirebaseFailure(e);
    }
    setLoading(false);
  };

  const handleFirebaseFailure = (e: any) => {
    if (isAdmin) {
      console.log({ e });
    }
    setUsefulLinks(defaultUsefulLinks);
    snackbar.show(
      'error',
      `Data fetch failed due to huge traffic load.
        Meanwhile please use comment thread.`,
    );
  };

  const handleCardClick = (docId: string) => {
    history.push(getViewRequestRoute(docId));
  };

  const handleTabChange = (event, newValue: number) => {
    const currentUrlParams = new URLSearchParams(location.search);
    currentUrlParams.set('tab', newValue?.toString());
    history.push({
      pathname: location.pathname,
      search: '?' + currentUrlParams.toString(),
    });
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

  const renderSingleCard = (card: typeof requests[0]) => {
    return (
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <Card
          className={`${card.requestStatus?.value === 'open' ?
            classes.openCard :
            classes.closedCard
            }`}
          onClick={() => handleCardClick(card.id)}
        >
          {/* <CardMedia
            className={classes.cardMedia}
            image={card.image}
            title="Image title"
          /> */}
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.requestTitle}
            </Typography>
            <hr />
            <Tooltip
              style={{ width: '250px' }}
              enterDelay={500}
              title={
                <>
                  <Typography color="inherit">
                    {card.requestDescription}
                  </Typography>
                </>
              }
              placement="top"
            >
              <Typography noWrap>{card.requestDescription}</Typography>
            </Tooltip>
            <br />
            <Box style={{ display: 'flex', color: 'rgba(0, 0, 0, 0.54)' }}>
              <Typography style={{ marginRight: '10px' }}>
                <i>Requested By:</i>
              </Typography>
              <Typography>{card.requesterName}</Typography>
            </Box>
            <Box style={{ display: 'flex', color: 'rgba(0, 0, 0, 0.54)' }}>
              <Typography style={{ marginRight: '10px' }}>
                <i>Address:</i>
              </Typography>
              <Typography>
                {card.patientDistrict?.label}, {card.patientState?.label}
              </Typography>
            </Box>
            {/* {card.requestStatus?.value === "closed" ? (
              <Typography style={{ display: "flex", alignItems: "center" }}>
                Donor: {card.donorName}
                <FavoriteIcon
                  color="secondary"
                  fontSize="small"
                  style={{ marginLeft: "5px" }}
                />
              </Typography>
            ) : null} */}
            <br />
            <Chip
              label={card.patientBloodGroup?.label}
              variant="outlined"
            />{' '}
            <Chip label={card.requestCategory?.label} variant="outlined" />{' '}
            <Chip label={parseTime(card.updatedAt)} variant="outlined" /> <br />
            <br />
            {card.requestStatus?.value === 'open' ?
              <Button
                variant="contained"
                color="secondary"
                size="small"
                endIcon={<PanToolIcon />}
                onClick={() => handleCardClick(card.id)}
              >
                I want to help
              </Button> :
              null}
          </CardContent>
        </Card>
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
      <Container maxWidth="md">
        <Typography
          component="h2"
          variant={isUpSm ? 'h3' : 'h6'}
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Care for the Living <br></br>
        </Typography>
        <Typography
          variant={isUpSm ? 'h6' : 'subtitle1'}
          align="center"
          color="textSecondary"
          paragraph
        >
          &#34;If you truly loved yourself, you could never hurt another.&#34;
          <br />
          {/* - Buddha */}
        </Typography>
      </Container>
    );
  };

  const renderLinkCard = (data?: UsefulLink, index?: number) => {
    return (
      <Grid item key={`add-link-${index || '*'}`} xs={12} sm={6} md={4}>
        <AddEditLinkCard prefillData={data} onReloadRequested={loadLinks} />
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
                          {usefulLinks?.map((link, index) =>
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
                        requests.map((card) => renderSingleCard(card)) :
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
          onChange={handleTabChange}>

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
              <Badge badgeContent={urlKeys.tab.key === 'useful_links' ? usefulLinks?.length : 0} color="primary">
                <BeenhereIcon />
              </Badge>
            } />

          {user?.email ?
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
      <div className={classes.heroContent}>{renderHeader()}</div>
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
