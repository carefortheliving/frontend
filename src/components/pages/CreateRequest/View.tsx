/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './View.css';
import Paper from '@material-ui/core/Paper';
import HelpImage from './help.jpg';
import Grid from '@material-ui/core/Grid';
import { useAppContext, changeTitle, changeBackButton } from 'src/contexts/AppContext';
import { getLoginRoute, getHomeRoute } from 'src/components/common/RouterOutlet/routerUtils';
import useFirebase from 'src/hooks/useFirebase';
import useFirestore from 'src/hooks/useFirestore';
import withAuth from 'src/components/common/withAuth/View';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { CATEGORIES, BLOOD_GROUPS, locations } from 'src/Constants/FilterData';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import { RequestType } from 'src/types';
import validations from './Validations';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';

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
      padding: '4px !important',
    },
  },
})(TextField);
const useStyles = makeStyles(() => ({
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
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [indianState, setIndianState] = useState('');
  const { indianStates, allStates } = locations();
  const [indianCity, setIndianCity] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const snackbar = useSnackbar();
  const { addRequest } = useFirestore();


  useEffect(() => {
    if (!email) {
      history.push(getLoginRoute());
    }
    firebaseAnalytics.logEvent('create/edit_request_visited');
    dispatch(changeTitle('My Request'));
    dispatch(changeBackButton(true));
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      snackbar.show('error', `You're not authorized for the action!`);
      return;
    }
    const payload:RequestType = {
      donorEmail: '',
      donorName: '',
      patientBloodGroup: { value: blood||'', label: blood||'' },
      patientDistrict: { value: indianCity||'', label: indianCity||'' },
      patientState: { value: indianState||'', label: indianState||'' },
      requestCategory: { value: category||'', label: category||'' },
      patientGender: { value: gender, label: gender },
      requestTitle: subject,
      requestDescription: description||'',
      requestStatus: { value: 'open', label: 'Open' },
      requesterContactNumber: mobile,
      requesterName: name,
      requesterEmail: email,
      patientAge: age,
    };
    const validation = validations(payload);
    if ( validation !== 'true' ) {
      snackbar.show('error', validation);
      return;
    }
    console.log(payload);
    try {
      const res = await addRequest(payload);
      console.log(res);
      snackbar.show(
          'success',
          `Request 
        created successfully! Please also keep an eye on your post comment thread and useful links tab`,
      );
    // history.push(getViewRequestRoute(params?.docId || (res as any)?.id));
    } catch (e) {
      snackbar.show(
          'error',
          `Error while creating the request !`,
      );
    }
  };
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
              onChange={(event) => {
                setName(event?.target.value);
              }}
              className='cr--element__position1'
              value={name}
              name='name'
              placeholder='John Doe'
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.centerElement} style={{ justifyContent: 'space-evenly' }} >
            <ValidationTextField
              label='Email'
              required={true}
              variant="outlined"
              defaultValue={email}
              className='cr--element__position6'
              disabled
            />
            <ValidationTextField
              label='Age'
              required={true}
              variant="outlined"
              onChange={(event) => {
                setAge(event?.target.value);
              }}
              className='cr--element__position7'
              value={age}
              name='age'
              placeholder='XX'
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.centerElement} style={{ justifyContent: 'space-evenly' }} >
            <ValidationTextField
              label='Mobile'
              required={true}
              variant="outlined"
              defaultValue={phoneNumber || ''}
              onChange={(event) => {
                setMobile(event?.target.value);
              }}
              className='cr--element__position4'
              value={mobile}
              name='mobile'
              placeholder='10 Digit Number'
            />
            <ValidationTextField
              name='gender'
              select
              label="Gender"
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
              variant="outlined"
              className='cr--element__position5'
            >
              {['Male', 'Female', 'Other'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </ValidationTextField>
          </Grid>
          <Grid item xs={12} md={6} className={classes.centerElement} style={{ justifyContent: 'space-evenly' }} >
            <ValidationTextField
              name='category'
              select
              label="Category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                if (['Blood', 'Plasma'].includes(event.target.value)) {
                  setWidth(true);
                } else {
                  setWidth(false);
                  setBlood('');
                }
              }}
              variant="outlined"
              className={width ? classes.showBloodGroup : classes.hideBloodGroup}
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
              onChange={(event) => setBlood(event.target.value)}
              variant="outlined"
              className='cr--element__position3'
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
              onChange={(event) => setIndianState(event.target.value)}
              variant="outlined"
              className='cr--element__position1'
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
              onChange={(event) => setIndianCity(event.target.value)}
              variant="outlined"
              className='cr--element__position1'
            >
              {indianState && allStates[indianState].map((option) => (
                <MenuItem key={option.city} value={option.city}>
                  {option.city}
                </MenuItem>
              ))}
            </ValidationTextField>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.centerElement} >
          <ValidationTextField
            label='Subject'
            required={true}
            variant="outlined"
            onChange={(event) => {
              setSubject(event?.target.value);
            }}
            className='cr--element__position2'
            value={subject}
            name='subject'
            placeholder='Describe your issue in short words'
          />
        </Grid>
        <Grid item xs={12} className={classes.centerElement} >
          <TextareaAutosize
            rowsMin={10}
            placeholder="Explain the issue briefly"
            className='cr--element__position2 cr--from__textarea'
            onChange={(event) => {
              setDescription(event?.target.value);
            }}
            value={description}
          />
        </Grid>
        <Grid container xs={12} className='cr--buttob__container' >
          <Grid item xs={6} className={classes.centerElement} >
            <Button
              variant="contained"
              startIcon={<CloseIcon style={{ fill: 'white' }} />}
              className='cr--cancel__button'
              onClick={()=>history.push(getHomeRoute())}
            >
        Cancel
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.centerElement}>
            <Button
              variant="contained"
              endIcon={<CheckCircleIcon style={{ fill: 'white' }}/>}
              className='cr--submit__button'
              onClick={handleSubmit}
            >
        Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withAuth(View);


// /Image optimise
// /inline styling
// /put image under src/assets/images
// /bg color
// common form fields
