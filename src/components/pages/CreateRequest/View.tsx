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
import useModel, { CreateRequestProps } from './model';
import { bloodGroupsOptions, categoriesOptions, gendersOptions } from './constants';

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

const CreateRequest: React.FC<CreateRequestProps> = (props) => {
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
  } = model;

  const renderSelectPlaceholder = (text: string) => {
    return (
      <Typography style={{ color: theme.colors.fifth }}>{text}</Typography>
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
              options={categoriesOptions}
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
                'Select Gender',
            )}
            options={gendersOptions}
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
            options={bloodGroupsOptions}
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
