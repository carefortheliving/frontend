/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import withAuth from "src/components/common/withAuth/View";
import { useHistory, useParams } from "react-router-dom";
import { getHomeRoute } from "src/components/common/RouterOutlet/routerUtils";
import Navbar from "src/components/common/Navbar/View";
import { Controller, useForm } from "react-hook-form";
import useFirestore from "src/hooks/useFirestore";
import { useSnackbar } from "src/components/common/SnackbarProvider/View";
import { RequestType } from "src/types";
import Footer from "src/components/common/Footer/View";
import Box from "@material-ui/core/Box";

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

interface SayThanksProps {}

const SayThanks: React.FC<SayThanksProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const defaultValues = {
    donorEmail: "",
    donorName: "",
  } as Pick<RequestType, "donorEmail" | "donorName">;
  const { handleSubmit, control, setValue } = useForm({ defaultValues });
  const params = useParams();
  const { updateRequest, getRequest } = useFirestore();
  const snackbar = useSnackbar();

  React.useEffect(() => {
    prefillData();
  }, []);

  const prefillData = async () => {
    const existingRequest = await getRequest(params?.docId);
    if (typeof existingRequest === "object") {
      Object.keys(existingRequest).forEach((key) => {
        setValue(key as any, existingRequest?.[key]);
      });
    }
  };

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      await updateRequest(params?.docId, {
        ...data,
        requestStatus: { value: "closed", label: "Closed" },
      });
      snackbar.show("success", `Request closed successfully!`);
      history.push(getHomeRoute());
    } catch (e) {
      snackbar.show("error", `Couldn't close request!`);
    }
  };

  const handleCancel = async () => {
    history.push(getHomeRoute());
  };

  const renderEmail = () => {
    return (
      <Controller
        name={"donorEmail"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Donor's email id"
            style={{ width: "100%", height: "100px" }}
          />
        )}
      />
    );
  };

  const renderDonor = () => {
    return (
      <Controller
        name={"donorName"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            style={{ width: "100%" }}
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
        style={{ marginRight: "10px" }}
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
    <div className={classes.root}>
      <CssBaseline />

      <Navbar showBack title="Say Thanks"/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            {/* <Typography variant="h3" style={{ marginBottom: "50px" }}>
              Say thanks
            </Typography> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid container xs={12} sm={12}>
                  <Grid item xs>
                    <Typography variant="h5">Donors's Name</Typography>
                  </Grid>
                  <Grid item xs>
                    {renderDonor()}
                  </Grid>
                </Grid>

                <Grid container xs={12} sm={12}>
                  <Grid item xs>
                    <Typography variant="h5">Donors's Email Id</Typography>
                  </Grid>
                  <Grid item xs>
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
        </div>
        <Box mt={8}>
          <Footer />
        </Box>
      </main>
    </div>
  );
};

export default React.memo(withAuth(SayThanks));
