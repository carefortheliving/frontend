import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  openCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  closedCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    background: '#efefef',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  filter_Heading: {
    textAlign: 'center',
    margin: '1rem 0 1rem 0',
  },
  filter_Container: {
    position: 'relative',
  },
  filterCollapsed: {
    marginTop: theme.spacing(4),
  },
  filterCount: {
    marginLeft: '10px',
  },
  filter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    // minWidth: 650,
  },
}));
