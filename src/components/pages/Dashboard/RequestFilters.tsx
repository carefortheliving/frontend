import {
  Container,
  Grid,
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography
} from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useSnackbar } from "src/components/common/SnackbarProvider/View";
import useFirebase from "src/hooks/useFirebase";
import useFirestore from "src/hooks/useFirestore";
import useGeo from "src/hooks/useGeo";
import { FiltersType, RequestType } from "src/types";

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
interface RequestFiltersProps {
  onChangeFilter: (updatedFilters: Partial<FiltersType>) => void;
}

const RequestFilters: React.FC<RequestFiltersProps> = (props) => {
  const { onChangeFilter } = props;
  const classes = useStyles();
  const { auth } = useFirebase();
  const defaultValues = {
    requestCategory: undefined,
    // patientGender: undefined,
    // patientBloodGroup: undefined,
    // patientAge: undefined,
    patientState: undefined,
    patientDistrict: undefined,
    // donor: ''
  } as RequestType;
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
  const history = useHistory();
  const params = useParams();
  const { addRequest, updateRequest, getRequest } = useFirestore();
  const snackbar = useSnackbar();

  const handleStateChange = (state: string) => {
    const newDistricts =
      states[state]?.map((el) => ({ value: el.city, label: el.city })) || [];
    setDistricts(newDistricts);
  };

  const renderDescription = () => {
    return (
      <Controller
        name={"requestDescription"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextareaAutosize
            {...field}
            placeholder="Situation description goes here ..."
            style={{ width: "100%", height: "100px" }}
          />
        )}
      />
    );
  };

  const renderRequester = () => {
    return (
      <Controller
        name={"requesterName"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            style={{ width: "100%" }}
            placeholder="Requester's Name"
          />
        )}
      />
    );
  };

  const renderAge = () => {
    return (
      <Controller
        name={"patientAge"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            style={{ width: "100%" }}
            placeholder="Patient's Age"
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
              isClearable={true}
              {...field}
              placeholder="Select Category"
              onChange={(option) => {
                onChangeFilter({
                  requestCategory: option?.value,
                })
                field?.onChange(option);
              }}
              options={[
                { value: "plasma", label: "Plasma" },
                { value: "oxygen", label: "Oxygen" },
                { value: "medicine", label: "Medicine" },
                { value: "blood", label: "Blood" },
                { value: "money", label: "Monetary" },
                { value: "other", label: "Other" },
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
            isClearable={true}
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
        name="patientBloodGroup"
        control={control}
        render={({ field }) => (
          <Select
            isClearable={true}
            {...field}
            placeholder="Select Blood Group of the patient"
            options={[
              { value: "a+", label: "A+" },
              { value: "a-", label: "A-" },
              { value: "b+", label: "B+" },
              { value: "b-", label: "B-" },
              { value: "c+", label: "C+" },
              { value: "c-", label: "C-" },
              { value: "o+", label: "O+" },
              { value: "o-", label: "O-" },
              { value: "ab+", label: "AB+" },
              { value: "ab+", label: "AB+" },
            ]}
          />
        )}
      />
    );
  };

  const renderContactNumber = () => {
    return (
      <Controller
        name={"requesterContactNumber"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <MuiPhoneNumber
            {...field}
            defaultCountry={"in"}
            onlyCountries={["in"]}
            disableCountryCode
            disableDropdown
            style={{ width: "100%" }}
            placeholder="Contact Number"
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
            isClearable={true}
            {...field}
            placeholder="Select State"
            onChange={(option) => {
              handleStateChange(option?.value);
              onChangeFilter({
                patientState: option?.value
              })
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
            isClearable={true}
            isDisabled={!districts.length}
            {...field}
            placeholder="Select District"
            options={districts}
            onChange={(option) => {
              onChangeFilter({
                patientDistrict: option?.value
              })
              field?.onChange(option);
            }}
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
  //           handleStatusChange(option?.value);
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
    <div className={classes.heroContent}>
      <Container maxWidth="md">
        <form 
          // onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={1}>
            <Grid container xs={12} sm={12}>
              {/* <Grid container xs={12} sm={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Requester's Name</Typography>
                </Grid>
                <Grid item xs={12}>
                  {renderRequester()}
                </Grid>
              </Grid> */}

              {/* <Grid container xs={12} sm={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Contact Number</Typography>
                </Grid>
                <Grid item xs={12}>
                  {renderContactNumber()}
                </Grid>
              </Grid> */}

              <Grid container xs={12} sm={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Category</Typography>
                </Grid>
                <Grid item xs={12}>
                  {renderCategory()}
                </Grid>
              </Grid>

              {/* <Grid container xs={12} sm={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Patient's Gender</Typography>
                </Grid>
                <Grid item xs={12}>
                  {renderGender()}
                </Grid>
              </Grid> */}

              {/* <Grid container xs={12} sm={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Patient's Blood Group</Typography>
                </Grid>
                <Grid item xs={12}>
                  {renderBloodGroup()}
                </Grid>
              </Grid> */}

              {/* <Grid container xs={12} sm={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Patient's Age</Typography>
                </Grid>
                <Grid item xs={12}>
                  {renderAge()}
                </Grid>
              </Grid> */}

              <Grid container xs={12} sm={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">State</Typography>
                </Grid>
                <Grid item xs={12}>
                  {renderState()}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">District</Typography>
                </Grid>
                <Grid item xs={12}>
                  {renderDistrict()}
                </Grid>
              </Grid>

              {/* <Grid container xs={12} sm={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Description</Typography>
                </Grid>
                <Grid item xs={12}>
                  {renderDescription()}
                </Grid>
              </Grid> */}

              {/* <Grid
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
              </Grid> */}
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default RequestFilters;
