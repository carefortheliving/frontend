import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: 'auto',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
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
          <Grid item xs={12} sm={4}>
            <Typography variant='body2'>fork me @
              <a
                className={classes.link}
                href="https://github.com/carefortheliving/frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{'CareForTheLiving'}</strong>
              </a></Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>Made with ❤️️ in 🇮🇳</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body2'>contributors:
              <a
                className={classes.link}
                href="https://github.com/duke79"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{' Pulkit, '}</strong>
              </a>
              <a
                className={classes.link}
                href="https://github.com/mikr13"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{'Mihir, '}</strong>
              </a>
              <a
                className={classes.link}
                href="https://github.com/alok722"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{'Alok & '}</strong>
              </a>
              <a
                className={classes.link}
                href="https://github.com/Sravan2305"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{'Sravan'}</strong>
              </a>
            </Typography>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}
