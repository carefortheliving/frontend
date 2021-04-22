import * as React from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import withAuth from "src/components/common/withAuth/View";
import { useHistory, useParams } from "react-router-dom";
import {
  getEditRequestRoute,
  getHomeRoute,
  getSayThanksRoute,
} from "src/components/common/RouterOutlet/routerUtils";
import Navbar from "src/components/common/Navbar/View";
import useFirestore from "src/hooks/useFirestore";
import useFirebase from "src/hooks/useFirebase";
import { RequestType } from "src/types";
import moment from "moment";
import { parseTime } from "src/utils/commonUtils";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
import Footer from "src/components/common/Footer/View";

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

interface ViewRequestProps {}

const ViewRequest: React.FC<ViewRequestProps> = ({}) => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const { addRequest, updateRequest, getRequest } = useFirestore();
  const [data, setData] = React.useState(undefined as undefined | RequestType);
  const { auth } = useFirebase();

  React.useEffect(() => {
    prefillData();
  }, []);

  const prefillData = async () => {
    const existingRequest = await getRequest(params?.docId);
    // console.log({ existingRequest });
    if (typeof existingRequest === "object") {
      setData(existingRequest as any);
    }
  };

  const handleCloseClick = () => {
    history.push(getSayThanksRoute(params?.docId));
  };

  const handleEditClick = () => {
    history.push(getEditRequestRoute(params?.docId));
  };

  const handleCancel = async () => {
    history.push({
      pathname: getHomeRoute(),
      search: "?tab=1",
    });
  };

  const renderCloseButton = () => {
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCloseClick}
        style={{ marginRight: "10px" }}
      >
        Close
      </Button>
    );
  };

  const renderCancelButton = () => {
    return (
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    );
  };

  const renderEditButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditClick}
        style={{ marginRight: "10px" }}
      >
        Edit
      </Button>
    );
  };

  const renderFieldValue = (
    value: string | undefined,
    style = {} as React.CSSProperties
  ) => {
    return (
      <Typography variant="h5" style={style}>
        {value || "-"}
      </Typography>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Navbar showBack title="Request Details" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography variant="h3" style={{ marginBottom: "50px" }}>
              Request Details
            </Typography>
            <Grid container spacing={1}>
              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">Requester's Name</Typography>
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.requesterName)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">Contact Number</Typography>
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.requesterContactNumber)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">Category</Typography>
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.requestCategory?.label)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">Patient's Gender</Typography>
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.patientGender?.label)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">Patient's Blood Group</Typography>
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.patientBloodGroup?.label)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">State</Typography>
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.patientState?.label)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">District</Typography>
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.patientDistrict?.label)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">Description</Typography>
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.requestDescription)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">Created At</Typography>
                </Grid>
                <Grid item xs>
                  {renderFieldValue(parseTime(data?.createdAt))}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  <Typography variant="h5">Updated At</Typography>
                </Grid>
                <Grid item xs>
                  {renderFieldValue(parseTime(data?.updatedAt))}
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

              {data?.requestStatus?.value === "open" ? (
                data?.requesterEmail === auth?.user?.email ? (
                  <Grid
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    // justify="flex-end"
                    className={classes.buttons}
                  >
                    <Grid item xs={6} sm={6} md={4} spacing={2}>
                      {renderEditButton()}
                      {renderCloseButton()}
                    </Grid>

                    {/* <Grid item xs={6} sm={6} md={4} spacing={2} justify="flex-end">
                  {renderCancelButton()}
                </Grid> */}
                    {/* <Grid item xs={12} sm={6} md={4} spacing={2}>
                  {renderResolve()}
                </Grid> */}
                  </Grid>
                ) : null
              ) : (
                <>
                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">Donor Name</Typography>
                    </Grid>
                    <Grid item xs>
                      <span style={{ display: "flex", alignItems: "center" }}>
                        {renderFieldValue(data?.donorName, {
                          fontWeight: 600,
                        })}
                        <FavoriteIcon
                          color="secondary"
                          fontSize="small"
                          style={{ marginLeft: "5px" }}
                        />
                      </span>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">Donor Email</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderFieldValue(data?.donorEmail, {
                        fontWeight: 600,
                      })}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      <Typography variant="h5">Status</Typography>
                    </Grid>
                    <Grid item xs>
                      {renderFieldValue("Closed", {
                        fontWeight: 600,
                      })}
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Container>
        </div>
        <Box mt={8}>
          <Footer />
        </Box>
      </main>
    </div>
  );
};

// export default React.memo(withAuth(ViewRequest));
export default React.memo(ViewRequest);
