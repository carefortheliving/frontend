import React, { useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import withAuth from "src/components/common/withAuth/View";
import { useFormContext, Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { TextField, TextareaAutosize } from "@material-ui/core";
import Navbar from "src/components/common/Navbar/View";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiPhoneNumber from "material-ui-phone-number";
import useGeo from 'src/hooks/useGeo';
import { useHistory } from "react-router-dom";
import { getHomeRoute } from 'src/components/common/RouterOutlet/routerUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  buttons: {
    marginTop: "50px",
  },
}));
interface CreateRequestProps {
  isEdit?: boolean;
}

const CreateRequest: React.FC<CreateRequestProps> = ({
  isEdit
}) => {
  const classes = useStyles();
  // const { user } = useAuth();
  const defaultValues = {
    description: 'Manglam',
    requester: 'Koi toh',
    category: { value: 'plasma', label: 'Plasma' },
    gender: { value: 'male', label: 'Male' },
    bloodGroup: { value: 'a+', label: 'A+' },
    state: { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    district: { value: 'Muzaffarnagar', label: 'Muzaffarnagar' },
    contactNumber: '9823784323',
    // status: { value: 'open', label: 'Open' },
    // donor: ''
  };
  const {
    handleSubmit,
    control,
    reset,
    register,
    setValue,
    getValues,
  } = useForm({ defaultValues });
  const { states } = useGeo();
  const [districts, setDistricts] = React.useState([]);
  // const [isDonorVisible, setIsDonorVisible] = React.useState(defaultValues.status.value === 'closed');
  const history = useHistory();

  // useEffect(() => {
  //   if (!(user && user.email)) {
  //     history.push("/login");
  //   }
  // }, []);

  const handleStateChange = (state: string) => {
    // getValues().state.value
    const newDistricts =
      states[state]?.map((el) => ({ key: el.city, label: el.city })) || [];
    setDistricts(newDistricts);
    setValue("district", newDistricts[0]);
  };

  // const handleStatusChange = (status: string) => {
  //   console.log({ status });
  //   setIsDonorVisible(status === 'closed');
  // };

  const onSubmit = async (data) => {
    console.log(data);
    history.push(getHomeRoute());
  };

  const handleCancel = async () => {
    history.push(getHomeRoute());
  };

  const renderDescription = () => {
    return <Controller
      name={'description'}
      control={control}
      defaultValue=""
      render={({ field }) => <TextareaAutosize {...field}
        placeholder="Description goes here ..."
        style={{ width: '100%', height: '100px' }} />}
    />;
  };

  const renderRequester = () => {
    return <Controller
      name={'requester'}
      control={control}
      defaultValue=""
      render={({ field }) => <TextField {...field}
        style={{ width: '100%' }} placeholder="Requester's Name" />}
    />;
  };

  const renderCategory = () => {
    return <Controller
      name="category"
      control={control}
      render={({ field }) => {
        return <Select
          {...field}
          placeholder="Select Category"
          options={[
            { value: "plasma", label: "Plasma" },
            { value: "blood", label: "Blood" },
            { value: "other", label: "Other" },
          ]}
        />;
      }}
    />;
  };

  const renderGender = () => {
    return (
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Select Blood Group of the patient"
            options={[
              { value: "male", label: "Male" },
              { value: "femal", label: "Female" },
            ]}
          />
        )}
      />
    );
  };

  const renderBloodGroup = () => {
    return (
      <Controller
        name="bloodGroup"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Select Blood Group of the patient"
            options={[
              { value: "a+", label: "A+" },
              { value: "a-", label: "A-" },
              { value: "b+", label: "B+" },
              { value: "b-", label: "B-" },
              { value: "c+", label: "C+" },
              { value: "c-", label: "C-" },
              { value: "ab+", label: "AB+" },
              { value: "ab+", label: "AB+" },
            ]}
          />
        )}
      />
    );
  };

  const renderContactNumber = () => {
    return <Controller
      name={'contactNumber'}
      control={control}
      defaultValue=""
      render={({ field }) => <MuiPhoneNumber {...field}
        defaultCountry={'in'}
        onlyCountries={['in']}
        disableCountryCode
        disableDropdown
        style={{ width: '100%' }}
        placeholder="Contact Number" />}
    />;
  };

  const renderState = () => {
    return <Controller
      name="state"
      control={control}
      render={({ field }) => <Select
        {...field}
        placeholder="Select State"
        onChange={(option) => {
          handleStateChange(option.value);
          field?.onChange(option);
        }}
        options={Object.keys(states).map(key => ({ value: key, label: key }))}
      />}
    />;
  };

  const renderDistrict = () => {
    return (
      <Controller
        name="district"
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
  };

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

  const renderSubmit = () => {
    return <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit(onSubmit)}
      style={{ marginRight: '10px' }}
    >
      Submit
  </Button>;
  };

  const renderCancel = () => {
    return <Button
      variant="contained"
      onClick={handleCancel}
    >
      Cancel
    </Button>;
  };

  // const renderResolve = () => {
  //   return <Button
  //     variant="contained"
  //     onClick={handleCancel}
  //     color="secondary"
  //   >
  //     Close Request
  //   </Button>;
  // };

  return <div className={classes.root}>
    <CssBaseline />

    <Navbar title="Care for the Living" />
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
                  <Typography variant="h5">Patient's Blood Group</Typography>
                </Grid>
                <Grid item xs>
                  {renderBloodGroup()}
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

              <Grid container xs={12} sm={12} md={12}
                // justify="flex-end"
                className={classes.buttons}>
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
      </div>
    </main>
  </div>;
};

export default withAuth(CreateRequest);
