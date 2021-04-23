// import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "src/components/common/Footer/View";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import FilterListIcon from '@material-ui/icons/FilterList';
import {  Modal } from 'antd';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Navbar from "src/components/common/Navbar/View";
import { useAuth } from "src/components/common/AuthProvider/View";
import * as React from "react";
import useFirestore from "src/hooks/useFirestore";
import { useSnackbar } from "src/components/common/SnackbarProvider/View";
import Button from "@material-ui/core/Button";
import Filter from "./Filters";
import { RequestType, UsefulLink } from "src/types";
import { parseTime } from "src/utils/commonUtils";
import { getViewRequestRoute } from "src/components/common/RouterOutlet/routerUtils";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Alert, AlertTitle } from "@material-ui/lab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PanToolIcon from "@material-ui/icons/PanTool";
import {
  useHistory,
  useParams,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { CircularProgress, Tooltip } from "@material-ui/core";
import {AllLocations} from '../../../Constants/FilterData'
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 240,
  },
  greet: {
    // marginLeft: "auto",
    // marginRight: "auto",
    textAlign: "center",
    paddingTop: "1em",
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  openCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  closedCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    background: "#efefef",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  filter_Heading: {
    textAlign: "center",
    margin: "3.5rem 0 1rem 0",
  },
  filter_Container: {
    position: "relative",
  },
  filter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    // minWidth: 650,
  },
}));

function Dashboard() {
  const classes = useStyles();
  const { user } = useAuth();
  const { getRequests, getUsefulLinks } = useFirestore();
  const snackbar = useSnackbar();
  const [requests, setRequests] = React.useState(
    [] as (RequestType & { id: string })[]
  );
  const [usefulLinks, setUsefulLinks] = React.useState([] as UsefulLink[]);
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
  const [filterResults , setFilterResults] = React.useState([] as Array<String>)
  const allLocations = AllLocations()

  const getCurrentTabFromUrl = () => {
    const currentUrlParams = new URLSearchParams(location.search);
    return Number(currentUrlParams.get("tab") || "0");
  };

  React.useEffect(() => {
    // loadData();
    loadLinks();
  }, [getCurrentTabFromUrl()]);

  const loadLinks = async () => {
    setLoading(true);
    const links = await getUsefulLinks();
    setLoading(false);
    setUsefulLinks(links);
  };

  // const loadData = async () => {
  //   try {
  //     const requests = await (async () => {
  //       switch(getCurrentTabFromUrl()) {
  //         case 0:
  //           return await getRequests({
  //             requestStatus: "open"
  //           });
  //         case 1:
  //           return user?.email && await getRequests({
  //             requesterEmail: user?.email,
  //           });
  //         default:
  //           return;
  //       }
  //     })();
  //     // console.log({ requests });
  //     setRequests(requests);
  //   } catch (e) {
  //     snackbar.show("error", `Something went wrong, try reloading!`);
  //   }
  // };

  //   const loadData = async () => {
  //   try {
  //     const requests = await (async()=>{
  //             return await getRequests({
  //             requestStatus: "open"
  //           });
  //     })()
  //     console.log(requests)
  //     setRequests(requests);
  //   } catch (e) {
  //     snackbar.show("error", `Something went wrong, try reloading!`);
  //   }
  // };
  // console.log(filterResults)
  React.useEffect(() => {
    const loadData = async () => {
      try {
        if(filterResults.length == 0)
          {
            setRequests([])
            return                                            
          }
        let status:String[]= []
        // let location:String[] = []
        // let category:String[] = []
        const keys = [...filterResults]
        keys.includes("Active")&&status.push("open")
        keys.includes("Completed")&&status.push("closed")
        // filterResults.includes("Completed") && status.push("closed")
        // keys.forEach(element => {
        //   if(allLocations.includes(element))
        //     {
        //     location.push(element)
        //     }
        // });
        // console.log(location)
        const requests = await (async()=>{
                return await getRequests({
                  requestStatus : status,
                  requestLocation:location
              });
        })()
        console.log(requests)
        setRequests(requests);
      } catch (e) {
        snackbar.show("error", `Something went wrong, try reloading!`);
      }
    };
    loadData()
   
  }, [filterResults])

  const handleCardClick = (docId: string) => {
    history.push(getViewRequestRoute(docId));
  };

  const handleTabChange = (event, newValue: number) => {
    const currentUrlParams = new URLSearchParams(location.search);
    currentUrlParams.set("tab", newValue?.toString());
    history.push({
      pathname: location.pathname,
      search: "?" + currentUrlParams.toString(),
    });
  };

  const renderSingleCard = (card: typeof requests[0]) => {
    return (
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <Card
          className={`${
            card.requestStatus?.value === "open"
              ? classes.openCard
              : classes.closedCard
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
              Need {card.requestCategory?.label} Donor
            </Typography>
            <hr />
            <Tooltip
              style={{ width: '300px' }}
              enterDelay={500} 
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    {card.requestDescription}
                  </Typography>
                </React.Fragment>
              }
              placement="top"
            >
              <Typography noWrap>{card.requestDescription}</Typography>
            </Tooltip>
            <br />
            <Box style={{ display: "flex", color: 'rgba(0, 0, 0, 0.54)' }}>
              <Typography style={{ marginRight: "10px" }}>
                <i>Requested By:</i>
              </Typography>
              <Typography>{card.requesterName}</Typography>
            </Box>
            <Box style={{ display: "flex", color: 'rgba(0, 0, 0, 0.54)' }}>
              <Typography style={{ marginRight: "10px" }}>
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
            />{" "}
            <Chip label={card.requestCategory?.label} variant="outlined" />{" "}
            <Chip label={parseTime(card.updatedAt)} variant="outlined" /> <br />
            <br />
            <Button
              variant="contained"
              color="secondary"
              size="small"
              endIcon={<PanToolIcon />}
              onClick={() => handleCardClick(card.id)}
            >
              I want to help
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const renderNoRequests = () => {
    return (
      <Container style={{ marginTop: "20px" }}>
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
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Care for the Living <br></br>
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          "If you truly loved yourself, you could never hurt another."
          <br />
          {/* - Buddha */}
        </Typography>
      </Container>
    );
  };

  const renderFilters = () => {
    return (
      <Grid item md={3}>
        {getCurrentTabFromUrl() === 0 ? <div className={classes.filter_Container}>
        <Typography component="h1" variant="h5" className={classes.filter_Heading}>
          Filter Requests
                  </Typography>
        <div className={classes.filter}>
          <Filter getFilters={(keys)=>setFilterResults(keys)} />
        </div>
      </div> : null}
      </Grid>
    );
  };

  const renderLinks = () => {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          {/* <TableHead>
          <TableRow>
            <TableCell>Link</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead> */}
          <TableBody>
            {usefulLinks?.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Typography gutterBottom variant="h6" component="h2">
                    <a href={row.link} target="blank">
                      {row.name}
                    </a>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography gutterBottom variant="subtitle1" component="h2">
                    {row.description}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderContent = () => {
    return (
      <Grid item md={9}>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {renderTabs()}
            {loading ? (
              <CircularProgress
                style={{ margin: "auto", marginTop: "100px" }}
              />
            ) : (
              (() => {
                switch (getCurrentTabFromUrl()) {
                  case 0:
                  case 1:
                    return requests?.length
                      ? requests.map((card) => renderSingleCard(card))
                      : renderNoRequests();
                  default:
                    return renderLinks();
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
      <div style={{ /*margin: '12px', */ width: "100%" }}>
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
            <Tab label="All Requests" />
            <Tab label="My Requests" />
            <Tab label="Useful links" />
          </Tabs>
        </AppBar>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.heroContent}>{renderHeader()}</div>
        <Grid container>
          {renderFilters()}
          {renderContent()}
        </Grid>
        <Box pt={4}>
          <Footer />
        </Box>
      </main>
    </div>
  );
}

export default Dashboard;
