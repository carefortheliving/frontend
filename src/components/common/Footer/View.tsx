import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  footer: {
    'padding': theme.spacing(3, 2),
    'marginTop': theme.spacing(2),
    'bottom': 0,
    'width': '100%',
    'textAlign': 'center',
    'backgroundColor': theme.colors.second,
    '& a': {
      color: theme.colors.zeroth,
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div>
      <footer className={classes.footer}>
        <Grid container spacing={3}>
          <Container>
            <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © '}
              {new Date().getFullYear()}
              <Typography variant='body2'>
                <a
                  className={classes.link}
                  href="https://github.com/carefortheliving"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>{'CareForTheLiving'}</strong>
                </a></Typography>
            </Typography>
          </Container>
        </Grid>
      </footer>
    </div>
  );
}
