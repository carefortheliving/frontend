import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/components/common/AuthProvider/View';
import useBreakpoint from 'src/hooks/useBreakpoint';
import useRoutes from 'src/hooks/useRoutes';
import { useAppContext } from 'src/contexts/AppContext';
import {
  getAboutRoute,
  getAdminPortalRoute,
  getCreateRequestRoute,
  getHomeRoute,
} from '../RouterOutlet/routerUtils';
import FabIcon from './FabIcon';
import useUser from 'src/hooks/useUser';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  btnStyle: {
    margin: theme.spacing(1),
    fontWeight: 600,
  },
}));

interface NavbarProps {
  showBack?: boolean;
  title?: string;
}

function Navbar(props: NavbarProps) {
  const { state } = useAppContext();
  const { logout, user } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const [profileBtn, setProfileBtn] = React.useState(null);
  const isUpSm = useBreakpoint('sm');
  const { isCreateRequest, isLogin } = useRoutes();
  const { isAdmin } = useUser();

  const isLogged = !!(user && user.uid);

  const handleProfileClick = (event) => {
    setProfileBtn(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileBtn(null);
  };
  const handleLogOut = () => {
    logout();
    history.push(getHomeRoute());
  };
  const handleRedirectHome = () => {
    history.push(getHomeRoute());
  };
  const handleAdminPortalClick = () => {
    history.push(getAdminPortalRoute());
  };

  const renderActions = () => {
    return !isCreateRequest && !isLogin ? (
      <>
        {isUpSm ? (
          <>
            <Button
              variant="contained"
              className={classes.btnStyle}
              size="small"
              color="secondary"
              onClick={() => history.push(getCreateRequestRoute())}
            >
              Create Request
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => history.push(getAboutRoute())}
            >
              About us
            </Button>
          </>
        ) : (
            <>
              <FabIcon />
              <IconButton
                color="inherit"
                onClick={() => history.push(getAboutRoute())}
              >
                <InfoIcon />
              </IconButton>
            </>
          )}
      </>
    ) : null;
  };

  const renderMenu = () => {
    return (
      <>
        {isLogged ? (
          <Box
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={handleProfileClick}
          >
            <IconButton color="inherit">
              <Badge color="secondary">
                <AccountCircleIcon />
              </Badge>
            </IconButton>
            {isUpSm ? user?.displayName : null}
          </Box>
        ) : (
            <></>
          )}
        <Menu
          id="simple-menu"
          anchorEl={profileBtn}
          keepMounted
          open={Boolean(profileBtn)}
          onClose={handleProfileClose}
        >
          {isUpSm ? null : <MenuItem disabled>{user?.displayName}</MenuItem>}
          <MenuItem>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdOIDnLsN0YSgsZTPsk09X95yde_1lE-9qS9YR5g4Y5sStCwA/viewform?usp=sf_link"
              target="blank"
              style={{ textDecoration: 'none' }}
            >
              Send Feedback
            </a>
          </MenuItem>
          {isAdmin ?
            <MenuItem onClick={handleAdminPortalClick}>
              Admin Portal
            </MenuItem> : null}
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </>
    );
  };

  const renderTitle = () => {
    return (
      <Typography
        component="h1"
        variant={isUpSm ? 'h6' : 'subtitle1'}
        color="inherit"
        noWrap
        className={classes.title}
      >
        {state.title || 'Care for the Living'}
      </Typography>
    );
  };

  return (
    <AppBar position="absolute">
      <Toolbar className={classes.toolbar}>
        {state.backButton && (
          <IconButton size="small" color="inherit" onClick={handleRedirectHome}>
            <ArrowBackIosIcon className={classes.btnStyle} />
          </IconButton>
        )}
        {renderTitle()}
        {renderActions()}
        {renderMenu()}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
