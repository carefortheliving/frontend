import * as React from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "components/common/Navbar/View";
import Footer from "components/common/Footer/View";
import Box from "@material-ui/core/Box";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import HearingIcon from "@material-ui/icons/Hearing";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  contentGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

interface SayAbout {}

const About: React.FC<SayAbout> = () => {
  const classes = useStyles();

  const renderHeader = () => {
    return (
      <Container maxWidth="md">
        <Typography
          component="h5"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Our Vision <br></br>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          paragraph
        >
          <i>
            Caring starts with listening! <HearingIcon /> <br />
            <br />
            We are committed to listen to the <strong>voice of pain</strong>
            {/* <RecordVoiceOverIcon /> */}, <br />
            and amplify that voice for those, to hear, who can help. <br />
            <br />
            If you are seeking help, <br />
            kindly click on <strong>Create Request</strong> and generate your
            request. <br />
            We will do our best to make it visible to the world. <br />
            <br />
          </i>
          {/* - Buddha */}
        </Typography>
      </Container>
    );
  };

  const renderContent = () => {
    return (
      <Grid item md={9}>
        <Container className={classes.contentGrid} maxWidth="lg">
          {/**Content goes here */}
        </Container>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Navbar showBack />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.heroContent}>{renderHeader()}</div>
        <Grid container>{renderContent()}</Grid>
        <Box mt={8}>
          <Footer />
        </Box>
      </main>
    </div>
  );
};

export default About;
