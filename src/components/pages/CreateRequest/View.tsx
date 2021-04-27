/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import {
  getHomeRoute,
  getLoginRoute,
  getViewRequestRoute,
} from 'src/components/common/RouterOutlet/routerUtils';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import useFirestore from 'src/hooks/useFirestore';
import useFirebase from 'src/hooks/useFirebase';
import useGeo from 'src/hooks/useGeo';
import { RequestType } from 'src/types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import {
  useAppContext,
  changeTitle,
  changeBackButton,
} from 'src/contexts/AppContext';
import withAuth from 'src/components/common/withAuth/View';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: '50px',
  },
  input: {
    width: '100%',
    border: 'solid hsl(0, 0%, 80%) 1px',
    borderRadius: '4px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
}));
interface CreateRequestProps {
  isEdit?: boolean;
}

const CreateRequest: React.FC<CreateRequestProps> = ({ isEdit }) => {
  const { dispatch } = useAppContext();
  const classes = useStyles();
  const { auth } = useFirebase();
  const defaultValues = {
    requestTitle: undefined,
    requestDescription: undefined,
    requesterName: undefined,
    requestCategory: undefined,
    patientGender: undefined,
    patientBloodGroup: undefined,
    patientAge: undefined,
    patientState: undefined,
    patientDistrict: undefined,
    requesterContactNumber: undefined,
  } as Partial<RequestType>;
  const { handleSubmit, control, setValue } = useForm({ defaultValues });
  const { states } = useGeo();
  const [districts, setDistricts] = useState([]);
  const history = useHistory();
  const params = useParams();
  const { addRequest, updateRequest, getRequest } = useFirestore();
  const snackbar = useSnackbar();
  const [data, setData] = useState(undefined as undefined | RequestType);

  useEffect(() => {
    firebaseAnalytics.logEvent('create/edit_request_visited');
    loadData();
    dispatch(changeBackButton(true));
  }, []);

  useEffect(() => {
    setValue('requesterName', auth?.user?.displayName);
  }, [auth?.user?.displayName]);

  useEffect(() => {
    ensurePermissions();
  }, [data?.requesterEmail]);

  useEffect(() => {
    prefillData();
  }, [data]);

  useEffect(() => {
    dispatch(changeTitle(isEdit ? 'Edit Request' : 'Create Request'));
  }, [isEdit]);

  const isValidUser = () => {
    return data?.requesterEmail ?
      data?.requesterEmail === auth?.user?.email :
      !!auth?.user?.email;
  };

  const ensurePermissions = () => {
    if (!isValidUser()) {
      history.push(getLoginRoute());
    }
  };

  const loadData = async () => {
    const existingRequest = isEdit ?
      await getRequest(params?.docId) :
      undefined;
    if (typeof existingRequest === 'object') {
      setData(existingRequest as any);
    }
  };

  const prefillData = async () => {
    data &&
      Object.keys(data).forEach((key) => {
        setValue(key as any, data?.[key]);
      });
  };

  const handleStateChange = (state: string) => {
    // getValues().state.value
    const newDistricts =
      states[state]?.map((el) => ({ value: el.city, label: el.city })) || [];
    setDistricts(newDistricts);
    setValue('patientDistrict', newDistricts[0]);
  };

  const validateFields = (data: RequestType) => {
    const requiredKeys: (keyof Partial<RequestType>)[] = [
      'requestTitle',
      'requestCategory',
      'patientBloodGroup',
      'requestDescription',
      'requesterContactNumber',
    ];
    const missingKey = requiredKeys.find((key) => !data?.[key]);
    if (missingKey) {
      snackbar.show('error', `Field "${missingKey}" must not be empty!`);
      return false;
    }
    return true;
  };

  const onSubmit = async (data: RequestType) => {
    if (!isValidUser()) {
      snackbar.show('error', `You're not authorized for the action!`);
      return;
    }
    if (!validateFields(data)) return;
    try {
      const payload: RequestType = pickBy(data, identity) as any;
      const res = isEdit ?
        await updateRequest(params?.docId, payload) :
        await addRequest({
          ...payload,
          requestStatus: { value: 'open', label: 'Open' },
          requesterEmail: auth?.user?.email,
        });
      snackbar.show(
          'success',
          `Request 
          ${ isEdit ? 'updated' : 'created' } successfully! Please also keep an eye on your post comment thread and useful links tab`,
      );
      // message.success('Request created successfully!')
      history.push(getViewRequestRoute(params?.docId || (res as any)?.id));
    } catch (e) {
      console.error('Error adding document: ', e);
      snackbar.show(
          'error',
          `Couldn't ${
          isEdit ? 'update' : 'create'
          } request!\n All the fields are mandatory!`,
      );
      // message.error(`Couldn't create request!`);
    }
  };

  const handleCancel = async () => {
    history.push(getHomeRoute());
  };

  const renderSelectPlaceholder = (text: string) => {
    return (
      <Typography style={{ color: 'rgba(0, 0, 0, 0.40)' }}>{text}</Typography>
    );
  };

  const renderTitle = () => {
    return (
      <Controller
        name={'requestTitle'}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Situation title goes here ..."
            className={classes.input}
            InputProps={{ disableUnderline: true }}
          />
        )}
      />
    );
  };

  const renderDescription = () => {
    return (
      <Controller
        name={'requestDescription'}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextareaAutosize
            {...field}
            placeholder="Situation description goes here ..."
            style={{ width: '100%', height: '100px' }}
            className={classes.input}
          />
        )}
      />
    );
  };

  const renderRequester = () => {
    return (
      <Controller
        name={'requesterName'}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            style={{ width: '100%' }}
            placeholder="Requester's Name"
            className={classes.input}
            InputProps={{ disableUnderline: true }}
          />
        )}
      />
    );
  };

  const renderAge = () => {
    return (
      <Controller
        name={'patientAge'}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            style={{ width: '100%' }}
            placeholder="Patient's Age"
            className={classes.input}
            InputProps={{ disableUnderline: true }}
          />
        )}
      />
    );
  };

  const renderCategory = () => {
    return (
      <Controller
        name="requestCategory"
        control={control}
        render={({ field }) => {
          return (
            <Select
              {...field}
              placeholder={renderSelectPlaceholder('Select Category')}
              options={[
                { value: 'plasma', label: 'Plasma' },
                { value: 'oxygen', label: 'Oxygen' },
                { value: 'medicine', label: 'Medicine' },
                { value: 'blood', label: 'Blood' },
                { value: 'money', label: 'Monetary' },
                { value: 'other', label: 'Other' },
              ]}
            />
          );
        }}
      />
    );
  };

  const renderGender = () => {
    return (
      <Controller
        name="patientGender"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={renderSelectPlaceholder(
                'Select Gender of the patient',
            )}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'femal', label: 'Female' },
            ]}
          />
        )}
      />
    );
  };

  const renderBloodGroup = () => {
    return (
      <Controller
        name="patientBloodGroup"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={renderSelectPlaceholder(
                'Select Blood Group of the patient',
            )}
            options={[
              { value: 'a+', label: 'A+' },
              { value: 'a-', label: 'A-' },
              { value: 'b+', label: 'B+' },
              { value: 'b-', label: 'B-' },
              { value: 'c+', label: 'C+' },
              { value: 'c-', label: 'C-' },
              { value: 'o+', label: 'O+' },
              { value: 'o-', label: 'O-' },
              { value: 'ab+', label: 'AB+' },
              { value: 'ab+', label: 'AB+' },
            ]}
          />
        )}
      />
    );
  };

  const renderContactNumber = () => {
    return (
      <Controller
        name={'requesterContactNumber'}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <MuiPhoneNumber
            {...field}
            defaultCountry={'in'}
            onlyCountries={['in']}
            disableCountryCode
            disableDropdown
            style={{ width: '100%' }}
            placeholder="Contact Number"
            className={classes.input}
            InputProps={{ disableUnderline: true }}
          />
        )}
      />
    );
  };

  const renderState = () => {
    return (
      <Controller
        name="patientState"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={renderSelectPlaceholder('Select State')}
            onChange={(option) => {
              handleStateChange(option.value);
              field?.onChange(option);
            }}
            options={Object.keys(states).map((key) => ({
              value: key,
              label: key,
            }))}
          />
        )}
      />
    );
  };

  const renderDistrict = () => {
    return (
      <Controller
        name="patientDistrict"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={renderSelectPlaceholder('Select District')}
            options={districts}
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid container>
            <Grid item xs>
              <Typography variant="h6">Requester&apos;s Email</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6">
                {isEdit ? data?.requesterEmail : auth?.user?.email}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Typography variant="h6">Requester&apos;s Name</Typography>
            </Grid>
            <Grid item xs>
              {renderRequester()}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Typography variant="h6">Contact Number</Typography>
            </Grid>
            <Grid item xs>
              {renderContactNumber()}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Typography variant="h6">Category</Typography>
            </Grid>
            <Grid item xs>
              {renderCategory()}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Typography variant="h6">Patient&apos;s Gender</Typography>
            </Grid>
            <Grid item xs>
              {renderGender()}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Typography variant="h6">Patient&apos;s Blood Group</Typography>
            </Grid>
            <Grid item xs>
              {renderBloodGroup()}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Typography variant="h6">Patient&apos;s Age</Typography>
            </Grid>
            <Grid item xs>
              {renderAge()}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Typography variant="h6">State</Typography>
            </Grid>
            <Grid item xs>
              {renderState()}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Typography variant="h6">District</Typography>
            </Grid>
            <Grid item xs>
              {renderDistrict()}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Typography variant="h6">Title</Typography>
            </Grid>
            <Grid item xs>
              {renderTitle()}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Typography variant="h6">Description</Typography>
            </Grid>
            <Grid item xs>
              {renderDescription()}
            </Grid>
          </Grid>
          <Grid
            container
            // justify="flex-end"
            className={classes.buttons}
            spacing={2}
          >
            <Grid item xs={12} sm={6} md={4}>
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

export default withAuth(CreateRequest);
