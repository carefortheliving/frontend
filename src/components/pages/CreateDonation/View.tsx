/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import withAuth from 'src/components/common/withAuth/View';
import useModel, { CreateDonationProps } from './model';
import { antibodyTestStatusOptions, bloodGroupsOptions, categoriesOptions, gendersOptions, travelWillingnessOptions, vaccinationStatusOptions } from './constants';
import { KeyboardDatePicker } from '@material-ui/pickers/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers/MuiPickersUtilsProvider';
import moment from 'moment';

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

const CreateDonation: React.FC<CreateDonationProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const model = useModel(props);
  const {
    auth,
    data,
    isEdit,
    handleSubmit,
    districts,
    states,
    control,
    handleStateChange,
    onSubmit,
    handleCancel,
    getValues,
    setValue,
    watch,
  } = model;

  const renderSelectPlaceholder = (text: string) => {
    return (
      <Typography style={{ color: theme.colors.fifth }}>{text}</Typography>
    );
  };

  const renderTitle = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Title</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name={'donationTitle'}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Donation title goes here ..."
                className={classes.input}
                InputProps={{ disableUnderline: true }}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  };

  const renderDescription = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Description</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name={'donationDescription'}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                placeholder="Donation description goes here ..."
                style={{ width: '100%', height: '100px' }}
                className={classes.input}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  };

  const renderEmail = () => {
    return <Grid container>
      <Grid item xs>
        <Typography variant="h6">Donor&apos;s Email</Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="h6">
          {isEdit ? data?.donorEmail : auth?.user?.email}
        </Typography>
      </Grid>
    </Grid>;
  };

  const renderDonor = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Donor&apos;s Name</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name={'donorName'}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                style={{ width: '100%' }}
                placeholder="Donor's Name"
                className={classes.input}
                InputProps={{ disableUnderline: true }}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  };

  const renderAge = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Donor&apos;s Age</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name={'donorAge'}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                style={{ width: '100%' }}
                placeholder="Donor's Age"
                className={classes.input}
                InputProps={{ disableUnderline: true }}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  };

  const renderCategory = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Category</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name="donationCategory"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  isDisabled
                  {...field}
                  placeholder={renderSelectPlaceholder('Select Category')}
                  options={categoriesOptions}
                />
              );
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const renderGender = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Donor&apos;s Gender</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name="donorGender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={renderSelectPlaceholder(
                    'Select Gender',
                )}
                options={gendersOptions}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  };

  const renderBloodGroup = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Donor&apos;s Blood Group</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name="donorBloodGroup"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={renderSelectPlaceholder(
                    'Select Blood Group of the donor',
                )}
                options={bloodGroupsOptions}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  };

  const renderContactNumber = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Contact Number</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name={'donorContactNumber'}
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
        </Grid>
      </Grid>
    );
  };

  const renderState = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">State</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name="donorState"
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
        </Grid>
      </Grid>
    );
  };

  const renderDistrict = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">District</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name="donorDistrict"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={renderSelectPlaceholder('Select District')}
                options={districts}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  };

  const renderTravelWillingness = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">If you required, would you be ready to tavel?</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name="donorTravelWillingness"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={renderSelectPlaceholder('Select Option')}
                options={travelWillingnessOptions}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  };

  const renderCovidRecoveryDate = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Recovered from Covid-19 on?</Typography>
        </Grid>
        <Grid item xs>
          <KeyboardDatePicker
            className={classes.input}
            InputProps={{
              disableUnderline: true,
            }}
            value={moment(watch('covidRecoveryDate'))}
            onChange={(date) => {
              setValue('covidRecoveryDate', moment(date).valueOf());
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const renderAntibodyTestStatus = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Have you done an Antibody test?</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name="antibodyTestStatus"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={renderSelectPlaceholder('Select Option')}
                options={antibodyTestStatusOptions}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  };

  const renderVaccinationStatus = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Are you vaccinated?</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name="vaccinationStatus"
            control={control}
            render={({ field }) => (
              <Select {...field}
                placeholder={renderSelectPlaceholder('Select Option')}
                options={vaccinationStatusOptions}
              />
            )}
          />
        </Grid>
      </Grid>
    );
  };

  const renderMedicalComplication = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Any medical complication/disease?</Typography>
        </Grid>
        <Grid item xs>
          <Controller
            name={'medicalComplication'}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                placeholder="Medical complication goes here ..."
                style={{ width: '100%', height: '100px' }}
                className={classes.input}
              />
            )}
          />
        </Grid>
      </Grid>
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

  const renderActions = () => {
    return <Grid
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
    </Grid>;
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {renderEmail()}
            {renderDonor()}
            {renderContactNumber()}
            {renderCategory()}
            {renderGender()}
            {renderBloodGroup()}
            {renderAge()}
            {renderState()}
            {renderDistrict()}
            {renderTravelWillingness()}
            {renderCovidRecoveryDate()}
            {renderAntibodyTestStatus()}
            {renderVaccinationStatus()}
            {renderMedicalComplication()}
            {renderTitle()}
            {renderDescription()}
            {renderActions()}
          </Grid>
        </form>
      </Container>
    </MuiPickersUtilsProvider>
  );
};

export default withAuth(CreateDonation);
