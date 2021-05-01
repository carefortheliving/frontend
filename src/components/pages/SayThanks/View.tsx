/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo, FC } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NatureImage from 'src/Assets/Images/nature.jpg';
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withAuth from 'src/components/common/withAuth/View';
import { useHistory, useParams } from 'react-router-dom';
import { getHomeRoute } from 'src/components/common/RouterOutlet/routerUtils';
import { Controller, useForm } from 'react-hook-form';
import useFirestore from 'src/hooks/useFirestore';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import { RequestType } from 'src/types';
import { useAppStore } from 'src/stores/appStore';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';
import TextField from '@material-ui/core/TextField';
import '../CreateRequest/View.css';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: '50px',
  },
  centerElement: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
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
interface SayThanksProps {}

const SayThanks: FC<SayThanksProps> = () => {
  const [app, appActions] = useAppStore();
  const classes = useStyles();
  const history = useHistory();
  const defaultValues = {
    donorEmail: '',
    donorName: '',
  } as Pick<RequestType, 'donorEmail' | 'donorName'>;
  const { handleSubmit, control, setValue } = useForm({ defaultValues });
  const params = useParams();
  const { updateRequest, getRequest } = useFirestore();
  const snackbar = useSnackbar();

  useEffect(() => {
    firebaseAnalytics.logEvent('thank_you_page_visited');
    prefillData();
    appActions.setBackButton(true);
    appActions.setTitle('Say Thanks');
  }, []);

  const prefillData = async () => {
    const existingRequest = await getRequest(params?.docId);
    if (typeof existingRequest === 'object') {
      Object.keys(existingRequest).forEach((key) => {
        setValue(key as any, existingRequest?.[key]);
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateRequest(params?.docId, {
        ...data,
        requestStatus: { value: 'closed', label: 'Closed' },
      });
      snackbar.show('success', `Request closed successfully!`);
      history.push(getHomeRoute());
    } catch (e) {
      snackbar.show('error', `Couldn't close request!`);
    }
  };

  const handleCancel = async () => {
    history.push(getHomeRoute());
  };

  const renderEmail = () => {
    return (
      <Controller
        name={'donorEmail'}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Donor's email id"
            style={{ width: '100%', height: '100px' }}
          />
        )}
      />
    );
  };

  const renderDonor = () => {
    return (
      <Controller
        name={'donorName'}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            style={{ width: '100%' }}
            placeholder="Donors's Name"
          />
        )}
      />
    );
  };

  const renderSubmit = () => {
    return (
      <button
        onClick={handleSubmit(onSubmit)}
        className='st--thanks__button'
      >
        Thanks &#10084;
      </button>
    );
  };

  const renderCancel = () => {
    return (
      <button
      onClick={handleCancel}
      className='st--cancel__button'

      >
        Cancel &#10006;

      </button>
    );
  };

  return (
        <Grid container spacing={3} className="st--container">
          <Grid item xs={12} md={6} className="st--container__left">
            <div className='st--left__quote'>
                <p className='quotesymbol'></p>
                <p className='st--left__text'>The meaning of life is to find your gift. The purpose of life is to give it away.</p>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="st--container__right">
            <div className="right_items">
              <h2>
                Thank the saviour
              </h2>
              <p>and also let the world know them...</p>
              <Grid item xs={12}>
                  <Controller
                    name={'donorName'}
                    control={control}
                    render={({ field }) => (
                      <ValidationTextField
                        {...field}
                        placeholder="John Doe"
                        label= "Donor's Name"
                        required={true}
                        className="st--input marginTop"
                      />
                    )}
                  />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name={'donorEmail'}
                      control={control}
                      render={({ field }) => (
                        <ValidationTextField
                          {...field}
                          placeholder="Contact Number/ Email ID"
                          label= "Donor's Contact"
                          required={true}
                          className="st--input"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} className='button-inputs'>

                  {renderCancel()}
                  {renderSubmit()}

                  </Grid>
              </div>
          </Grid>
        </Grid>
  );
};

export default memo(withAuth(SayThanks));


