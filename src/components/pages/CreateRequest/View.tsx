import React from 'react';
import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import Navbar from 'components/common/Navbar/View';
import Box from '@material-ui/core/Box';
import {
  getHomeRoute,
  getLoginRoute,
  getViewRequestRoute,
} from 'components/common/RouterOutlet/routerUtils';
import Footer from 'components/common/Footer/View';
import { useSnackbar } from 'components/common/SnackbarProvider/View';
import useFirestore from 'hooks/useFirestore';
import useFirebase from 'hooks/useFirebase';
import useGeo from 'hooks/useGeo';
import { RequestType } from 'types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  buttons: {
    marginTop: '50px',
  },
}));

interface CreateRequestProps {
  isEdit?: boolean;
}

const CreateRequest: React.FC<CreateRequestProps> = ({ isEdit }: CreateRequestProps) => {
  const classes = useStyles();
  const { auth } = useFirebase();
  const defaultValues = {
    requestTitle: '',
    requestDescription: '',
    requesterName: '',
    requestCategory: { value: 'plasma', label: 'Plasma' },
    patientGender: { value: 'male', label: 'Male' },
    patientBloodGroup: { value: 'a+', label: 'A+' },
    patientAge: '',
    patientState: { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    patientDistrict: { value: 'Muzaffarnagar', label: 'Muzaffarnagar' },
    requesterContactNumber: '',
    // donor: ''
  } as RequestType;
  const {
    handleSubmit,
    control,
    setValue,
  } = useForm({ defaultValues });
  const { states } = useGeo();
  const [districts, setDistricts] = React.useState([]);
  const history = useHistory();
  const params = useParams();
  // const match = useRouteMatch();
  const { addRequest, updateRequest, getRequest } = useFirestore();
  const snackbar = useSnackbar();
  const [data, setData] = React.useState(undefined as undefined | RequestType);

  React.useEffect(() => {
    ensureLoggedIn();
    loadData();
  }, []);

  React.useEffect(() => {
    setValue('requesterName', auth?.user?.displayName);
  }, [auth?.user?.displayName]);

  React.useEffect(() => {
    ensurePermissions();
  }, [data?.requesterEmail]);

  React.useEffect(() => {
    prefillData();
  }, [data]);

  const ensureLoggedIn = async () => {
    if (!auth?.user?.email) {
      history.replace(getLoginRoute());
    }
  };

  const isValidUser = () => (data?.requesterEmail
    ? data?.requesterEmail === auth?.user?.email
    : !!auth?.user?.email);

  const ensurePermissions = () => {
    if (!isValidUser()) {
      history.push(getLoginRoute());
    }
  };

  const loadData = async () => {
    const existingRequest = isEdit
      ? await getRequest(params?.docId)
      : undefined;
    if (typeof existingRequest === 'object') {
      setData(existingRequest as any);
    }
  };

  const prefillData = async () => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key as any, data?.[key]);
      });
    }
  };

  const handleStateChange = (state: string) => {
    // getValues().state.value
    const newDistricts = states[state]?.map((el) => ({ value: el.city, label: el.city })) || [];
    setDistricts(newDistricts);
    setValue('patientDistrict', newDistricts[0]);
  };

  // const handleStatusChange = (status: string) => {
  //   console.log({ status });
  //   setIsDonorVisible(status === 'closed');
  // };

  const onSubmit = async (data: RequestType) => {
    // console.log(data);
    if (!isValidUser()) {
      snackbar.show('error', 'You\'re not authorized for the action!');
      return;
    }
    try {
      const res = isEdit
        ? await updateRequest(params?.docId, data)
        : await addRequest({
          ...data,
          requestStatus: { value: 'open', label: 'Open' },
          requesterEmail: auth?.user?.email,
        });
      // console.log({ newId: res.id });
      snackbar.show(
        'success',
        `Request ${isEdit ? 'updated' : 'created'} successfully!`,
      );
      // message.success('Request created successfully!')
      history.push(getViewRequestRoute(params?.docId || (res as any)?.id));
    } catch (e) {
      console.error('Error adding document: ', e);
      snackbar.show(
        'error',
        `Couldn't ${isEdit ? 'update' : 'create'} request!`,
      );
      // message.error(`Couldn't create request!`);
    }
  };

  const handleCancel = async () => {
    history.push(getHomeRoute());
  };

  const renderTitle = () => (
    <Controller
      name="requestTitle"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          placeholder="Situation title goes here ..."
          style={{ width: '100%' }}
        />
      )}
    />
  );

  const renderDescription = () => (
    <Controller
      name="requestDescription"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextareaAutosize
          {...field}
          placeholder="Situation description goes here ..."
          style={{ width: '100%', height: '100px' }}
        />
      )}
    />
  );

  const renderRequester = () => (
    <Controller
      name="requesterName"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          style={{ width: '100%' }}
          placeholder="Requester's Name"
        />
      )}
    />
  );

  const renderAge = () => (
    <Controller
      name="patientAge"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          style={{ width: '100%' }}
          placeholder="Patient's Age"
        />
      )}
    />
  );

  const renderCategory = () => (
    <Controller
      name="requestCategory"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          placeholder="Select Category"
          options={[
            { value: 'plasma', label: 'Plasma' },
            { value: 'oxygen', label: 'Oxygen' },
            { value: 'medicine', label: 'Medicine' },
            { value: 'blood', label: 'Blood' },
            { value: 'money', label: 'Monetary' },
            { value: 'other', label: 'Other' },
          ]}
        />
      )}
    />
  );

  const renderGender = () => (
    <Controller
      name="patientGender"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          placeholder="Select Blood Group of the patient"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'femal', label: 'Female' },
          ]}
        />
      )}
    />
  );

  const renderBloodGroup = () => (
    <Controller
      name="patientBloodGroup"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          placeholder="Select Blood Group of the patient"
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

  const renderContactNumber = () => (
    <Controller
      name="requesterContactNumber"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <MuiPhoneNumber
          {...field}
          defaultCountry="in"
          onlyCountries={['in']}
          disableCountryCode
          disableDropdown
          style={{ width: '100%' }}
          placeholder="Contact Number"
        />
      )}
    />
  );

  const renderState = () => (
    <Controller
      name="patientState"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          placeholder="Select State"
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

  const renderDistrict = () => (
    <Controller
      name="patientDistrict"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          placeholder="Select District"
          options={districts}
        />
      )}
    />
  );

  // const renderStatus = () => {
  //   return <Controller
  //     name="status"
  //     control={control}
  //     render={({ field }) => {
  //       return <Select
  //         {...field}
  //         isDisabled={!isEdit}
  //         placeholder="Select Status"
  //         options={[
  //           { value: "open", label: "Open" },
  //           { value: "closed", label: "Closed" },
  //         ]}
  //         onChange={(option) => {
  //           handleStatusChange(option.value);
  //           field?.onChange(option);
  //         }}
  //       />;
  //     }}
  //   />;
  // };

  // const renderDonor = () => {
  //   return <Controller
  //     name={'donor'}
  //     control={control}
  //     defaultValue=""
  //     render={({ field }) => <TextareaAutosize {...field}
  //       placeholder="Donor details"
  //       style={{ width: '100%', height: '100px' }} />}
  //   />;
  // };

  const renderSubmit = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit(onSubmit)}
      style={{ marginRight: '10px' }}
    >
      Submit
    </Button>
  );

  const renderCancel = () => (
    <Button variant="contained" onClick={handleCancel}>
      Cancel
    </Button>
  );

  // const renderResolve = () => {
  //   return <Button
  //     variant="contained"
  //     onClick={handleCancel}
  //     color="secondary"
  //   >
  //     Close Request
  //   </Button>;
  // };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar showBack title="Create Request" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography variant="h3" style={{ marginBottom: '50px' }}>
              {isEdit ? 'Edit Request' : 'Create Request'}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid container xs={12} sm={12}>
                  <Grid item xs>
                    <Typography variant="h5">Requester's Email</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      {isEdit ? data?.requesterEmail : auth?.user?.email}
                    </Typography>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">Requester's Name</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderRequester()}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">Contact Number</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderContactNumber()}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">Category</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderCategory()}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">Patient's Gender</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderGender()}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">
                        Patient's Blood Group
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      {renderBloodGroup()}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">Patient's Age</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderAge()}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">State</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderState()}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">District</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderDistrict()}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">Title</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderTitle()}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">Description</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderDescription()}
                    </Grid>
                  </Grid>

                  {/* <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">
                    Status
                  </Typography>
                </Grid>
                <Grid item xs>
                  {renderStatus()}
                </Grid>
              </Grid> */}

                  {/* {isDonorVisible ? <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">
                    Donor Details
                  </Typography>
                </Grid>
                <Grid item xs>
                  {renderDonor()}
                </Grid>
              </Grid> : null} */}

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
              </Grid>
            </form>
          </Container>
        </div>
        <Box pt={4}>
          <Footer />
        </Box>
      </main>
    </div>
  );
};

export default CreateRequest;
