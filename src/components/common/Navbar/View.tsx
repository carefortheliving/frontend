import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import useFirebase from "../../../hooks/useFirebase";
import { getCreateRequestRoute } from "../RouterOutlet/routerUtils";
import { useAuth } from "src/hooks/useFirebase";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  btnStyle: {
    margin: theme.spacing(1),
  },
}));

function Navbar(props) {
  const { logout } = useAuth();
  const classes = useStyles();
  let history = useHistory();
  const [profileBtn, setProfileBtn] = React.useState(null);
  const handleProfileClick = (event) => {
    setProfileBtn(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileBtn(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <LocalHospitalIcon className={classes.btnStyle} />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            onClick={() => history.push("/")}
          >
            {props.title}
          </Typography>
          <Button
            variant="contained"
            className={classes.btnStyle}
            size="small"
            color="secondary"
            onClick={() => history.push(getCreateRequestRoute())}
          >
            Create Request
          </Button>
          {!props.isLogged ? (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={() => history.push("/login")}
              >
                SignIn
              </Button>
            </>
          ) : (
            <IconButton color="inherit" onClick={handleProfileClick}>
              <Badge color="secondary">
                <AccountCircleIcon />
              </Badge>
            </IconButton>
          )}
          <Menu
            id="simple-menu"
            anchorEl={profileBtn}
            keepMounted
            open={Boolean(profileBtn)}
            onClose={handleProfileClose}
          >
            <MenuItem onClick={handleProfileClose}>My Requests</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
