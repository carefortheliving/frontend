/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo, FC } from 'react';
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { TextField } from '@material-ui/core';
import withAuth from 'src/components/common/withAuth/View';
import { useHistory, useParams } from 'react-router-dom';
import { getHomeRoute } from 'src/components/common/RouterOutlet/routerUtils';
import { Controller, useForm } from 'react-hook-form';
import useFirestore from 'src/hooks/useFirestore';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import { RequestType } from 'src/types';
import {
  useAppContext,
  changeTitle,
  changeBackButton,
} from 'src/contexts/AppContext';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: '50px',
  },
}));

interface SayThanksProps {}

const SayThanks: FC<SayThanksProps> = () => {
  const { dispatch } = useAppContext();
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
    prefillData();
    dispatch(changeBackButton(true));
    dispatch(changeTitle('Say Thanks'));
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}
        style={{ marginRight: '10px' }}
      >
        Submit
      </Button>
    );
  };

  const renderCancel = () => {
    return (
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    );
  };

  return (
    <Container maxWidth="md">
      {/* <Typography variant="h3" style={{ marginBottom: "50px" }}>
              Say thanks
            </Typography> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Donors&apos;s Name</Typography>
            </Grid>
            <Grid item xs={6}>
              {renderDonor()}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">Donors&apos;s Email Id</Typography>
            </Grid>
            <Grid item xs={6}>
              {renderEmail()}
            </Grid>
          </Grid>

          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            // justify="flex-end"
            className={classes.buttons}
          >
            <Grid item xs={12} sm={6} md={4} spacing={2}>
              {renderSubmit()}
              {renderCancel()}
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4} spacing={2}>
                  {renderResolve()}
                </Grid> */}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default memo(withAuth(SayThanks));
