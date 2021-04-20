import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Footer from "src/components/common/Footer/View";
import { useHistory } from "react-router-dom";
import useFirebase from "src/hooks/useFirebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inLink: {
    // textDecoration: 'none',
  },
}));

function LogIn() {
  const { getAuthStatus, signInWithGoogle } = useFirebase();
  const classes = useStyles();
  let history = useHistory();
  
  
  useEffect(() => {
    if (getAuthStatus()) {
      history.push("/");
    }
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Login
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={login}
        >
          Sign In With Google
        </Button>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );

  async function login() {
    try {
      await signInWithGoogle();
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LogIn;
