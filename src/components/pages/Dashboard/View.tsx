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
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PanToolIcon from '@material-ui/icons/PanTool';
import FilterList from '@material-ui/icons/FilterList';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
import Disqus from 'src/components/common/Disqus/View';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CancelIcon from '@material-ui/icons/Cancel';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';
import CaseCount from 'src/components/common/CaseCount/View';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  openCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  closedCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    background: '#efefef',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  filter_Heading: {
    textAlign: 'center',
    margin: '1rem 0 1rem 0',
  },
  filter_Container: {
    position: 'relative',
  },
  filterCollapsed: {
    marginTop: theme.spacing(4),
  },
  filterCount: {
    marginLeft: '10px',
  },
  filter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    // minWidth: 650,
  },
}));

function Dashboard() {
  const { dispatch } = useAppContext();
  const classes = useStyles();
  const { user } = useAuth();
  const { getRequests, getUsefulLinks, getCount } = useFirestore();
  const snackbar = useSnackbar();
  const [pageURL, setPageURL] = useState('');
  const [requests, setRequests] = useState(
    [] as (RequestType & { id: string })[],
  );
  const [usefulLinks, setUsefulLinks] = useState([
    {
      name: 'Realtime Leads',
      link:
        'https://docs.google.com/document/d/1rgHki3hQF_Q8SR_nfj6MtUN5JYN0DNnZMtrOUHKQA78/edit?usp=sharing',
      description: 'This link contains leads of covid resources in realtime.',
    },
    {
      name: 'CrowdSourcing of Data [CovidsFacts]',
      link: 'https://covidfacts.in/',
      description:
        'This link contains information regarding leads of medical requirements',
    },
    {
      name: 'EDGE | Covid Action - India',
      link:
        'https://www.notion.so/EDGE-Covid-Action-India-20APR21-01-30-100d217d90a04d1fbb46e2455de46722',
      description: 'EDGE | Covid Action - India',
    },
    {
      name: 'so.city/covid19',
      link: 'https://so.city/covid19',
      description: 'Covid resources for Delhi',
    },
    {
      name: 'covidresource.glideapp.io',
      link: 'https://covidresource.glideapp.io/',
      description: 'Covid Useful Rescources',
    },
    {
      name: 'bhopalcovidbeds.in',
      link: 'https://http://www.bhopalcovidbeds.in/',
      description: 'To check bed availability in Bhopal',
    },
    {
      name: 'external.sprinklr.com',
      link:
        'https://external.sprinklr.com/insights/explorer/dashboard/601b9e214c7a6b689d76f493/tab/1?id=DASHBOARD_601b9e214c7a6b689d76f493',
      description: 'Covid Resources',
    },
    {
      name: 'dhoondh.com',
      link: 'https://www.dhoondh.com/',
      description: 'To search for plasma donors.',
    },
  ] as UsefulLink[]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
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
  const [count, setCount] = useState({});

  const getCurrentTabFromUrl = () => {
    const currentUrlParams = new URLSearchParams(location.search);
    return Number(currentUrlParams.get('tab') || '0');
  };

  useEffect(() => {
    firebaseAnalytics.logEvent('dashboard_page_visited');
    resetFilters();
    loadCount();
    loadData();
    loadLinks();
  }, [getCurrentTabFromUrl()]);

  useEffect(() => {
    loadData();
  }, [appliedFilters]);

  useEffect(() => {
    dispatch(changeBackButton(false));
    dispatch(changeTitle('Care for the Living'));
    setPageURL(window.location.href);
  }, []);

  const loadLinks = async () => {
    setLoading(true);
    const links = await getUsefulLinks();
    setLoading(false);
    setUsefulLinks(links);
  };

  const loadCount = async () => {
    const resp: any = await getCount();
    setCount(resp);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const requests = await (async () => {
        switch (getCurrentTabFromUrl()) {
          case 0:
            return await getRequests({
              ...appliedFilters,
              requestStatus: 'open',
              sortBy: filtersCount ? undefined : {
                key: 'updatedAt',
                direction: 'desc',
              },
            });
          case 1:
            return await getRequests({
              ...appliedFilters,
              requestStatus: 'closed',
              sortBy: filtersCount ? undefined : {
                key: 'updatedAt',
                direction: 'desc',
              },
            });
          case 2:
            return;
          case 3:
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
      if (isAdmin) {
        console.log({ e });
      }
      snackbar.show(
          'error',
          `Data fetch failed due to huge traffic load.
          Meanwhile please use comment thread.`,
      );
    }
    setLoading(false);
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
          className={`${
            card.requestStatus?.value === 'open' ?
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
            null }
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
        <CaseCount count={count} />
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
                switch (getCurrentTabFromUrl()) {
                  case 2:
                    return (
                      <>
                        {usefulLinks?.map((link, index) =>
                          renderLinkCard(link, index),
                        )}
                        {isAdmin ? renderLinkCard() : null}
                      </>
                    );
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
          value={getCurrentTabFromUrl()}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          // aria-label="disabled tabs example"
          // variant="fullWidth"
        >
          <Tab icon={<EnhancedEncryptionIcon />} label="Open Requests" />
          <Tab icon={<CancelIcon />} label="Closed Requests" />
          <Tab icon={<BeenhereIcon />} label="Useful links" />
          {user?.email && <Tab icon={<NotificationsActiveIcon />} label="My Requests" />}
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
          {getCurrentTabFromUrl() === 0 ?
            isUpSm ?
              renderFilters() :
              renderFiltersCollapsed() :
            null}
          {renderContent()}
        </Grid>
        <Grid item sm={12}>
          <Disqus
            url={pageURL}
            id="73yyr7h3h718yr37y8****72ye73873wd3y8"
            title="Care for the Living Homepage"
            language="en"
          />
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
