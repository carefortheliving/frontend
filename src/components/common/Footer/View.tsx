import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  footerStyle: {
    position: 'static',
    bottom: '1%',
    left: 0,
    width: '100%',
    textAlign: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box marginY={5}>
      <Typography
        className={classes.footerStyle}
      >
        Made with ❤️️ in 🇮🇳 by <a
          href="https://github.com/carefortheliving/frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>{' carefortheliving'}</strong>
        </a> & <a
          href="https://opendevs.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>{' open devs'}</strong>
        </a>
      </Typography>
    </Box>
  );
}
