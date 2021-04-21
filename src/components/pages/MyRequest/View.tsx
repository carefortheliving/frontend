import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "src/components/common/Footer/View";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Navbar from "src/components/common/Navbar/View";
import Typography from "@material-ui/core/Typography";
import { useAuth } from "src/hooks/useFirebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  greet: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    paddingTop: "2em",
  },
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  openCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  closedCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#efefef",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function MyRequest() {
  const classes = useStyles();
  const { user } = useAuth();

  const history = useHistory();
  useEffect(() => {
    if (!(user && user.email)) {
      history.push("/login");
    }
  }, []);
  useEffect(() => {
    // TODO: Call firebase to fetch records
  }, []);

  const cards = [
    {
      id: 1,
      title: "Need Plasma Donor",
      image: "https://source.unsplash.com/random",
      category: "Donor",
      state: "Bihar",
      district: "East Champaran",
      requestor: "Ramesh",
      contact: "+91-8240159173",
      updated: "6:00pm",
      status: "closed",
    },
    {
      id: 2,
      title: "Need Plasma Donor",
      image: "https://source.unsplash.com/random",
      category: "Donor",
      state: "Bihar",
      district: "East Champaran",
      requestor: "Ramesh",
      contact: "+91-8240159173",
      updated: "6:00pm",
      status: "open",
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Navbar title="Care for the Living" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.greet}>
          <Typography component="h1" variant="h5">
            My Requests
          </Typography>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  className={`${
                    card.status === "open"
                      ? classes.openCard
                      : classes.closedCard
                  }`}
                >
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>Requested By: {card.requestor}</Typography>
                    <Typography>
                      Address: {card.district}, {card.state}
                    </Typography>
                    <Typography>Mobile: {card.contact}</Typography>
                    <br />
                    <Chip label={card.category} variant="outlined" />
                    <Chip label={card.updated} variant="outlined" />
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary" variant="outlined">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box pt={4}>
          <Footer />
        </Box>
      </main>
    </div>
  );
}

export default MyRequest;
