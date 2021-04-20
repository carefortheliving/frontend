import * as React from 'react';
import { StylesProps } from '../../../types';
import withStyles from 'react-jss';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  loader: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

interface LoginProps extends
  StylesProps<ReturnType<typeof styles>> {
}

const AppLoader: React.FC<LoginProps> = ({
  classes,
}) => {
  return <div className={classes.loader}>
    <CircularProgress />
  </div>;
};

export default React.memo(
  withStyles(styles)(AppLoader)
);
