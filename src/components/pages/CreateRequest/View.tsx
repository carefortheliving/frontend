import React, { useEffect, useState } from 'react';
import './View.css';
import Paper from '@material-ui/core/Paper';
import HelpImage from './help.jpg';
import Grid from '@material-ui/core/Grid';
import { useAppContext, changeTitle, changeBackButton } from 'src/contexts/AppContext';
import { getLoginRoute } from 'src/components/common/RouterOutlet/routerUtils';
import useFirebase from 'src/hooks/useFirebase';
import withAuth from 'src/components/common/withAuth/View';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { CATEGORIES, BLOOD_GROUPS, locations } from 'src/Constants/FilterData';
import MenuItem from '@material-ui/core/MenuItem';

const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'blue',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 8,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);
const useStyles = makeStyles(()=>({
  centerElement: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showBloodGroup: {
    width: '35%',
    marginTop: '10px',
  },
  hideBloodGroup: {
    width: '80%',
    marginTop: '10px',
  },
}));
function View() {
  const classes = useStyles();
  const history = useHistory();
  const { displayName, email, phoneNumber } = useFirebase()?.auth?.user || { displayName: null, email: null, phoneNumber: null };
  const { dispatch } = useAppContext();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [category, setCategory] = useState('');
  const [width, setWidth] = useState(false);
  const [blood, setBlood] = useState('');
  const [indianState, setIndianState] = useState('');
  const { indianStates, allStates } = locations();
  const [indianCity, setIndianCity] = useState('');

  console.log( displayName, phoneNumber ); // remove this line
  useEffect(() => {
    if (!email) {
      history.push(getLoginRoute());
    }
    dispatch(changeTitle('My Request'));
    dispatch(changeBackButton(true));
  }, []);

  return (
    <div className="cr--body">
      <Paper variant="outlined" square elevation={3} className="cr--container">
        <div className="header">
          <img src={HelpImage} className="cr--image" alt="Together - We are strong"></img>
          <div className="cr--image__heading">Together - We are strong</div>
        </div>
        <Grid container spacing={3} className="form--container">
          <Grid item xs={12} md={6} className={classes.centerElement} >
            <ValidationTextField
              label='Name'
              required={true}
              variant="outlined"
              defaultValue={displayName}
              onChange={(event)=>{
                setName(event?.target.value);
              }}
              style={ { width: '80%', marginTop: '10px' } }
              value={name}
              name='name'
              placeholder='John Doe'
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.centerElement} >
            <ValidationTextField
              label='Email'
              required={true}
              variant="outlined"
              defaultValue={email}
              style={ { width: '80%', marginTop: '10px' } }
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.centerElement} >
            <ValidationTextField
              label='Mobile'
              required={true}
              variant="outlined"
              defaultValue={phoneNumber || '' }
              onChange={(event)=>{
                setMobile(event?.target.value);
              }}
              style={ { width: '80%', marginTop: '10px' } }
              value={mobile}
              name='mobile'
              placeholder='10 Digit Number'
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.centerElement} style={{ justifyContent: 'space-arround' }} >
            <ValidationTextField
              name='category'
              select
              label="Category"
              value={category}
              onChange={(event)=>{
                setCategory(event.target.value);
                if ( ['Blood', 'Plasma'].includes(event.target.value) ) {
                  setWidth(true);
                } else {
                  setWidth(false);
                }
              }}
              variant="outlined"
              className={width?classes.showBloodGroup:classes.hideBloodGroup}
            >
              {CATEGORIES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </ValidationTextField>

            {width && <ValidationTextField
              name='blood'
              select
              label="Group"
              value={blood}
              onChange={(event)=>setBlood(event.target.value)}
              variant="outlined"
              style={ { width: '35%', marginTop: '10px' } }
            >
              {BLOOD_GROUPS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </ValidationTextField>}
          </Grid>
          <Grid item xs={12} md={6} className={classes.centerElement} >
            <ValidationTextField
              name='states'
              select
              label='State'
              value={indianState}
              onChange={(event)=>setIndianState(event.target.value)}
              variant="outlined"
              style={ { width: '80%', marginTop: '10px', borderColor: 'blue' } }
            >
              {indianStates.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </ValidationTextField>
          </Grid>
          <Grid item xs={12} md={6} className={classes.centerElement}>
            <ValidationTextField
              name='cities'
              select
              label='City'
              value={indianCity}
              onChange={(event)=>setIndianCity(event.target.value)}
              variant="outlined"
              style={ { width: '80%', marginTop: '10px', borderColor: 'blue' } }
            >
              {indianState && allStates[indianState].map((option) => (
                <MenuItem key={option.city} value={option.city}>
                  {option.city}
                </MenuItem>
              ))}
            </ValidationTextField>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.centerElement}>

        </Grid>
      </Paper>
    </div>
  );
};

export default withAuth(View);


// /style={{ justifyContent: 'space-arround' }}
// /Image optimise
// /inline styling
// /put image under src/assets/images
// /bg color
// common form fields
