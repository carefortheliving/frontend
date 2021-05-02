/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/components/common/AuthProvider/View';
import {
  getCreateRequestRoute,
} from 'src/components/common/RouterOutlet/routerUtils';
import { useAppStore } from 'src/stores/appStore';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LogIn() {
  const app = useAppStore();
  const { user, signInWithGoogle } = useAuth();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    firebaseAnalytics.logEvent('login_view_visited');
    if (user?.uid) {
      history.push(getCreateRequestRoute());
    }
    app.setBackButton(true);
    app.setTitle('Login here');
  }, []);

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        User Login
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={login}
      >
        Sign In With Google
      </Button>
    </div>
  );

  async function login() {
    try {
      await signInWithGoogle();
      history.push(getCreateRequestRoute());
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LogIn;
