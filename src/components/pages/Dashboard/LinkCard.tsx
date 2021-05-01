/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  Button,
  Card,
  CardContent,
  Container,
  makeStyles,
  TextField,
  Typography,
  TextareaAutosize,
} from '@material-ui/core';
import React, { useState, useEffect, FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UsefulLink } from '../../../types';
import useFirestore from 'src/hooks/useFirestore';
import useUser from '../../../hooks/useUser';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';

const useStyles = makeStyles((theme) => ({
  openCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

type LinkCardProps = {
  // type: 'add' | 'view';
  prefillData?: UsefulLink;
  onReloadRequested?: () => void;
};

const LinkCard: FC<LinkCardProps> = (props) => {
  const { prefillData, onReloadRequested } = props;
  const type = prefillData ? 'view' : 'add';
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const defaultValues = {
    ...prefillData,
  };
  const { handleSubmit, control, setValue } = useForm({ defaultValues });
  const {
    addUsefulLink,
    updateUsefulLink,
  } = useFirestore();
  const { isAdmin, email } = useUser();
  const snackbar = useSnackbar();

  useEffect(() => {
    firebaseAnalytics.logEvent('LinkCard_visited');
    handlePrefillData();

    return () => {
      setIsEdit(false);
    };
  }, [prefillData]);

  const handlePrefillData = async () => {
    prefillData &&
      Object.keys(prefillData).forEach((key) => {
        setValue(key as any, prefillData?.[key]);
      });
  };

  const onSubmit = async (data: typeof defaultValues) => {
    if (!data.link) {
      snackbar.show('error', `Link is mandatory!`);
      return;
    }
    try {
        type === 'view' ?
          await updateUsefulLink((prefillData as any)?.docId, data as any) :
          await addUsefulLink({
            ...(data as any),
            addedBy: email,
          });
        snackbar.show(
            'success',
            `Request ${type === 'view' ? 'updated' : 'added'} successfully!`,
        );
        setIsEdit(false);
        if (typeof onReloadRequested === 'function') {
          onReloadRequested();
        }
    } catch (e) {
      console.error('Error adding document: ', e);
      snackbar.show('error', `Couldn't ${isEdit ? 'update' : 'add'} link!`);
    }
  };

  const renderInput = (key: keyof typeof defaultValues) => {
    return (
      <Controller
        name={key}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} style={{ width: '100%' }} placeholder={key} />
        )}
      />
    );
  };

  const renderTextArea = (key: keyof typeof defaultValues) => {
    return (
      <Controller
        name={key}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextareaAutosize
            {...field}
            style={{ width: '100%', height: '100px' }}
            placeholder={key}
          />
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
        style={{ marginLeft: '10px' }}
      >
        Cancel
      </Button>
    );
  };

  const renderEdit = () => {
    return (
      <>
        {/* <Typography variant="h6">Name</Typography> */}
        {renderInput('name')}
        {renderInput('link')}
        {renderTextArea('description')}
        <Grid container style={{ marginTop: '20px' }}>
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
            case 'view':
              return prefillData ? renderLink(prefillData) : null;
            case 'add':
            default:
              return renderAddCard();
          }
        })()}
      </CardContent>
    </Card>
  );
};

export default LinkCard;
