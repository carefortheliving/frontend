import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "src/components/common/Footer/View";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Navbar from "src/components/common/Navbar/View";
import { useAuth } from "src/components/common/AuthProvider/View";
import * as React from 'react';
import useFirestore from 'src/hooks/useFirestore';
import { useSnackbar } from "src/components/common/SnackbarProvider/View";

import Filter from "./Filters"
import { RequestType } from "src/types";
import { parseTime } from "src/utils/commonUtils";
import { getViewRequestRoute } from "src/components/common/RouterOutlet/routerUtils";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

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
    cursor: 'pointer',
  },
  closedCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    cursor: 'pointer',
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
    margin: "3.5rem 0 1rem 0"
  },
  filter_Container: {
    position: "relative"
  },
  filter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

function Dashboard() {
  const classes = useStyles();
  const { user } = useAuth();
  const { getRequests } = useFirestore();
  const snackbar = useSnackbar();
  const [requests, setRequests] = React.useState([] as (RequestType & { id: string })[]);
  const history = useHistory();

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const requests = await getRequests();
      console.log({ requests });
      setRequests(requests);
    } catch (e) {
      snackbar.show('error', `Something went wrong, try reloading!`);
    }
  };

  const handleCardClick = (docId: string) => {
    history.push(getViewRequestRoute(docId));
  };

  const renderCard = (card: typeof requests[0]) => {
    return (
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <Card
          className={`${card.requestStatus?.value === "open"
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
            <Typography>Requested By: {card.requesterName}</Typography>
            <Typography>
              Address: {card.patientDistrict?.label}, {card.patientState?.label}
            </Typography>
            <Typography>Mobile: {card.requesterContactNumber}</Typography>
            <br />
            <Chip label={card.requestCategory?.label} variant="outlined" />
            <Chip label={parseTime(card.updatedAt)} variant="outlined" />
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Navbar title="Care for the Living" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Care for the Living <br></br>
              {/* Hello, {user?.displayName || "Guest"} */}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              The world suffers & always has, but doesn't have to.
              <br />
              You have the potential to change. Just keep going!
            </Typography>
          </Container>
        </div>
        <Grid container>
          <Grid item md={3} >
            <div className={classes.filter_Container}>
              <Typography component="h1" variant="h5" className={classes.filter_Heading}>
                Filter Requests
                          </Typography>
              <div className={classes.filter}>
                <Filter />
              </div>
            </div>
          </Grid>
          <Grid item md={9}>
            <Container className={classes.cardGrid} maxWidth="lg">
              <Grid container spacing={4}>
                {requests.map(card => renderCard(card))}
              </Grid>
            </Container>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Footer />
        </Box>
      </main>
    </div>
  );
}

export default Dashboard;
