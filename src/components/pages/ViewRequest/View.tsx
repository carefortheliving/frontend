import * as React from 'react';
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import withAuth from 'src/components/common/withAuth/View';
import { useHistory } from "react-router-dom";
import { getSayThanksRoute } from 'src/components/common/RouterOutlet/routerUtils';
import Navbar from "src/components/common/Navbar/View";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: 'column',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  buttons: {
    marginTop: '50px'
  }
}));

interface ViewRequestProps {}

const ViewRequest: React.FC<ViewRequestProps> = ({}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleCloseClick = () => {
    history.push(getSayThanksRoute());
  };

  const renderClose = () => {
    return <Button
      variant="contained"
      color="secondary"
      onClick={handleCloseClick}
      style={{ marginRight: '10px' }}
    >
      Close Request
  </Button>;
  };


  return <div className={classes.root}>
    <CssBaseline />

    <Navbar title="Care for the Living" />
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography variant="h3" style={{ marginBottom: '50px' }}>
            Request Details
          </Typography>
          {renderClose()}
        </Container>
      </div>
    </main>
  </div>;
};

export default React.memo(withAuth(ViewRequest));
