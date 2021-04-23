import * as React from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory, useParams } from "react-router-dom";
import {
  getEditRequestRoute,
  getSayThanksRoute,
} from "src/components/common/RouterOutlet/routerUtils";
import Navbar from "src/components/common/Navbar/View";
import useFirestore from "src/hooks/useFirestore";
import useFirebase from "src/hooks/useFirebase";
import { RequestType } from "src/types";
import { parseTime } from "src/utils/commonUtils";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
import Footer from "src/components/common/Footer/View";
import Disqus from 'src/components/common/Disqus/View';

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

interface ViewRequestProps { }

const ViewRequest: React.FC<ViewRequestProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const { getRequest } = useFirestore();
  const [data, setData] = React.useState(undefined as undefined | RequestType);
  const { auth } = useFirebase();
  const [pageURL, setPageURL] = React.useState('');
  const [pageID, setPageID] = React.useState('');

  React.useEffect(() => {
    setPageURL(window.location.href);
    const parts = window.location.href.split('/');
    setPageID(parts[parts.length - 1]);
  }, [])

  const prefillData = async () => {
    const existingRequest = await getRequest(params?.docId);
    // console.log({ existingRequest });
    if (typeof existingRequest === "object") {
      setData(existingRequest as any);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    prefillData();
  }, []);


  const handleCloseClick = () => {
    history.push(getSayThanksRoute(params?.docId));
  };

  const handleEditClick = () => {
    history.push(getEditRequestRoute(params?.docId));
  };

  const renderCloseButton = () => {
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCloseClick}
        // style={{ marginRight: "10px" }}
      >
        Mark as Resolved
      </Button>
    );
  };

  const renderEditButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditClick}
        style={{ marginRight: "5px" }}
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
      <Typography variant="subtitle2" style={style}>
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
            {/* <Typography variant="h5" style={{ marginBottom: "50px" }}>
              Request Details
            </Typography> */}
            <Grid container spacing={1}>
              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue(`Requester's Name`)}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.requesterName)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue('Contact Number')}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.requesterContactNumber)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue('Category')}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.requestCategory?.label)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue(`Patient's Gender`)}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.patientGender?.label)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue(`Patient's Blood Group`)}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.patientBloodGroup?.label)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue(`Patient's Age`)}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.patientAge)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue('State')}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.patientState?.label)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue('District')}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.patientDistrict?.label)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue('Title')}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.requestTitle)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue('Description')}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(data?.requestDescription)}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue('Created At')}
                </Grid>
                <Grid item xs>
                  {renderFieldValue(parseTime(data?.createdAt))}
                </Grid>
              </Grid>

              <Grid container xs={12} sm={12}>
                <Grid item xs>
                  {renderFieldValue('Updated At')}
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
                    <Grid item xs={12} md={6} spacing={2}>
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
                      {renderFieldValue('Donor Name')}
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
                      {renderFieldValue('Donor Email')}
                    </Grid>
                    <Grid item xs>
                      {renderFieldValue(data?.donorEmail, {
                        fontWeight: 600,
                      })}
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12}>
                    <Grid item xs>
                      {renderFieldValue('Status')}
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
            {
              data && data.requestTitle && (
                <Grid container xs={12} sm={12}>
                  <Grid item xs>
                    <Disqus url={ pageURL } id={ pageID } title={ data.requestTitle } language="en" />
                  </Grid>
                </Grid>
              )
            }
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
