import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from 'components/common/Navbar/View';
import Footer from 'components/common/Footer/View';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

interface SayAbout {}

const About: React.FC<SayAbout> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Navbar showBack />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        Hello About
        <Box mt={8}>
          <Footer />
        </Box>
      </main>
    </div>
  );
};

export default About;
