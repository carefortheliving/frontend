/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import HearingIcon from '@material-ui/icons/Hearing';
import {
  useAppContext,
  changeTitle,
  changeBackButton,
} from 'src/contexts/AppContext';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';

interface SayAbout {}

const About: React.FC<SayAbout> = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    firebaseAnalytics.logEvent('about_page_visited');
    dispatch(changeBackButton(true));
    dispatch(changeTitle('About'));
  }, []);

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
            If you wish to contribute to the good cause, <br/>
            kindly checkout <strong>requests</strong> on the dashboard and <br/>
            see what you can do to help.
          </i>
          {/* - Buddha */}
          <br/><br/><br/>
        </Typography>
        <Typography
          component="h5"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <strong>&quot;Let&apos;s fight this together. 💪&quot;</strong>
        </Typography>
      </Container>
    );
  };

  const renderContent = () => {
    return (
      <Grid item md={9}>
        <Container maxWidth="lg">{/** Content goes here */}</Container>
      </Grid>
    );
  };

  return (
    <>
      {renderHeader()}
      <Grid container>{renderContent()}</Grid>
    </>
  );
};

export default About;
