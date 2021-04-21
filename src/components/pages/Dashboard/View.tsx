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
import { useAuth } from "src/hooks/useFirebase";


import Filter from "./Filters"
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
  },
  closedCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#efefef",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  filter_Heading: {
    textAlign:"center",
    margin:"3.5rem 0 1rem 0"
  },
  filter_Container: {
    position:"relative"
  },
  filter:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
}));

function Dashboard() {
  const classes = useStyles();
  const { user } = useAuth();
  

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
    {
      id: 3,
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
      id: 4,
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
    {
      id: 5,
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

      <Navbar
        title="Care for the Living"
        isLogged={user && user.email ? true : false}
      />
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
              Hello, {user && user.email ? user.email : "Guest"}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
          </Container>
        </div>
            <Grid container>
                      <Grid item  md={3} >
                        <div className={classes.filter_Container}>
                          <Typography component="h1" variant="h5" className={classes.filter_Heading}>
                            Filter Requests
                          </Typography>
                          <div className={classes.filter}>
                                <Filter/>
                          </div> 
                      </div>
                      </Grid>
                      <Grid item md={9}>
                          <Container className={classes.cardGrid} maxWidth="lg">
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
                                </Card>
                              </Grid>
                            ))}
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
