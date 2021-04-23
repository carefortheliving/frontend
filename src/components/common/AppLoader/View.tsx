import * as React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loader: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
interface LoginProps {
}

const AppLoader: React.FC<LoginProps> = ({}) => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  );
};

export default AppLoader;
