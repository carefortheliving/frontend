import {
  Grid,
  Button,
  Card,
  CardContent,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { UsefulLink } from "../../../types";
import useFirestore from "src/hooks/useFirestore";
import useUser from "../../../hooks/useUser";

const useStyles = makeStyles((theme) => ({
  openCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));

type AddEditLinkCardProps = {
  // type: 'add' | 'view';
  prefillData?: UsefulLink;
};

const AddEditLinkCard: React.FC<AddEditLinkCardProps> = (props) => {
  const { prefillData } = props;
  const type = prefillData ? "view" : "add";
  const classes = useStyles();
  const [isEdit, setIsEdit] = React.useState(false);
  const defaultValues = {
    ...prefillData,
  };
  // console.log({ prefillData })
  const { handleSubmit, control, setValue } = useForm({ defaultValues });
  const { getUsefulLinks, addUsefulLink, updateUsefulLink, isCurrentUserAdmin } = useFirestore();
  const { isAdmin } = useUser();

  const onSubmit = async (data: typeof defaultValues) => {
    console.log(isAdmin);
    // if (!isValidUser()) {
    //   snackbar.show("error", `You're not authorized for the action!`);
    //   return;
    // }
    // try {
    //   const res = isEdit
    //     ? await updateRequest(params?.docId, data)
    //     : await addRequest({
    //         ...data,
    //         requestStatus: { value: "open", label: "Open" },
    //         requesterEmail: auth?.user?.email,
    //       });
    //   // console.log({ newId: res.id });
    //   snackbar.show(
    //     "success",
    //     `Request ${isEdit ? "updated" : "created"} successfully!`
    //   );
    //   // message.success('Request created successfully!')
    //   history.push(getViewRequestRoute(params?.docId || (res as any)?.id));
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    //   snackbar.show(
    //     "error",
    //     `Couldn't ${isEdit ? "update" : "create"} request!`
    //   );
    //   // message.error(`Couldn't create request!`);
    // }
  };

  const renderInput = (key: keyof typeof defaultValues) => {
    return (
      <Controller
        name={key}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} style={{ width: "100%" }} placeholder={key} />
        )}
      />
    );
  };

  const renderAddButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSubmit(onSubmit)}
        // style={{ marginTop: "20px" }}
      >
        Save
      </Button>
    );
  };

  const renderCancelButton = () => {
    return (
      <Button
        variant="contained"
        // color="primary"
        size="small"
        onClick={() => setIsEdit(false)}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </Button>
    );
  };

  const renderEdit = () => {
    return (
      <>
        {/* <Typography variant="h6">Name</Typography> */}
        {renderInput("name")}
        {renderInput("link")}
        {renderInput("description")}
        <Grid container style={{ marginTop: "20px" }}>
          {renderAddButton()}
          {renderCancelButton()}
        </Grid>
      </>
    );
  };

  const renderLink = (row: UsefulLink) => {
    return (
      <Container>
        <Typography gutterBottom variant="h6" component="h2">
          <a href={row.link} target="blank">
            {row.name}
          </a>
        </Typography>
        {/* <br/> */}
        <Typography gutterBottom variant="subtitle1" component="h2">
          {row.description}
        </Typography>
      </Container>
    );
  };

  const renderAddCard = () => {
    return (
      <Container style={{ margin: 'auto' }}>
        <Typography gutterBottom variant="h6" component="h2">
          + Add Link
        </Typography>
      </Container>
    );
  };

  return (
    <Card
      className={classes.openCard}
      onClick={() => !isEdit && isAdmin && setIsEdit(true)}
    >
      <CardContent className={classes.cardContent}>
        {(() => {
          if (isEdit) return renderEdit();
          switch (type) {
            case "view":
              return renderLink(prefillData);
            case "add":
            default:
              return renderAddCard();
          }
        })()}
      </CardContent>
    </Card>
  );
};

export default AddEditLinkCard;
