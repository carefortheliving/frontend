import * as React from 'react';
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import withAuth from 'src/components/common/withAuth/View';
import { useFormContext, Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { TextField, TextareaAutosize } from "@material-ui/core";
import Navbar from "src/components/common/Navbar/View";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiPhoneNumber from "material-ui-phone-number";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: 'column',
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
    marginTop: '50px'
  }
}));
interface CreateRequestProps {
}

const CreateRequest: React.FC<CreateRequestProps> = ({
}) => {
  const classes = useStyles();
  const defaultValues = {
    description: 'Manglam',
    requester: 'Koi toh',
    category: { value: 'plasma', label: 'Plasma'},
    gender: { value: 'male', label: 'Male'},
    bloodGroup: { value: 'a+', label: 'A+' },
    state: { value: 'plasma', label: 'Plasma'},
    district: { value: 'plasma', label: 'Plasma'},
    contactNumber: '9823784323'
  };
  const { handleSubmit, control, reset, register, setValue } = useForm({ defaultValues });
  const onSubmit = data => console.log(data);

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
      console.log({ field });
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
    return <Controller
      name="gender"
      control={control}
      render={({ field }) => <Select
        {...field}
        placeholder="Select Blood Group of the patient"
        options={[
          { value: "male", label: "Male" },
          { value: "femal", label: "Female" },
        ]}
      />}
    />;
  };

  const renderBloodGroup = () => {
    return <Controller
      name="bloodGroup"
      control={control}
      render={({ field }) => <Select
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
      />}
    />;
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
        placeholder="Contact Number"/>}
    />;
  };

  const renderState = () => {
    return <Controller
      name="state"
      control={control}
      render={({ field }) => <Select
        {...field}
        placeholder="Select State"
        options={[
          { value: "plasma", label: "Plasma" },
          { value: "blood", label: "Blood" },
          { value: "other", label: "Other" },
        ]}
      />}
    />;
  };

  const renderDistrict = () => {
    return <Controller
      name="district"
      control={control}
      render={({ field }) => <Select
        {...field}
        placeholder="Select District"
        options={[
          { value: "plasma", label: "plasma" },
          { value: "blood", label: "blood" },
        ]}
      />}
    />;
  };

  const renderSubmit = () => {
    return <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit(onSubmit)}
    >
      SUBMIT
  </Button>;
  };

  return <div className={classes.root}>
    <CssBaseline />

    <Navbar title="Care for the Living" />
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography variant="h3" style={{ marginBottom: '50px' }}>
            Request Registration
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">
                    Requester's Name
                  </Typography>
                </Grid>
                <Grid item xs>
                  {renderRequester()}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">
                    Contact Number
                  </Typography>
                </Grid>
                <Grid item xs>
                  {renderContactNumber()}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">
                    Category
                  </Typography>
                </Grid>
                <Grid item xs>
                  {renderCategory()}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">
                    Patient's Gender
                  </Typography>
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
                  <Typography variant="h5">
                    State
                  </Typography>
                </Grid>
                <Grid item xs>
                  {renderState()}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">
                    District
                  </Typography>
                </Grid>
                <Grid item xs>
                  {renderDistrict()}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">
                    Description
                  </Typography>
                </Grid>
                <Grid item xs>
                  {renderDescription()}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12} md={12}
                // justify="flex-end"
                className={classes.buttons}>
                <Grid item xs={6} sm={6} md={4}>
                  {renderSubmit()}
                </Grid>
              </Grid>

            </Grid>
          </form>
        </Container>
      </div>
    </main>
  </div>
    ;
};

export default React.memo(
  withAuth(CreateRequest)
);
