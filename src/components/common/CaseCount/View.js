import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: 'center',
  },
  textRed: {
    color: 'red',
  },
  textGreen: {
    color: 'green',
  },
}));

export default function CaseCount({ count }) {
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={4} xs={12}>
            <Card variant="outlined">
              <CardContent className={classes.textCenter}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total Requests
                </Typography>
                <Typography variant="h5" component="h2">
                  { count?.total }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card variant="outlined">
              <CardContent className={classes.textCenter}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Open Requests
                </Typography>
                <Typography variant="h5" component="h2" className={classes.textRed}>
                  { count?.open }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card variant="outlined">
              <CardContent className={classes.textCenter}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Closed Requests
                </Typography>
                <Typography variant="h5" component="h2" className={classes.textGreen}>
                  { count?.closed }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
