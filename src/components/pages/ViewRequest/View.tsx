/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo, FC, CSSProperties } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import {
  getEditRequestRoute,
  getSayThanksRoute,
} from 'src/components/common/RouterOutlet/routerUtils';
import useFirestore from 'src/hooks/useFirestore';
import useFirebase from 'src/hooks/useFirebase';
import { RequestType } from 'src/types';
import { parseTime } from 'src/utils/commonUtils';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Disqus from 'src/components/common/Disqus/View';
import { useAppStore } from 'src/stores/appStore';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';

interface ViewRequestProps {}

const ViewRequest: FC<ViewRequestProps> = () => {
  const app = useAppStore();
  const history = useHistory();
  const params = useParams();
  const { getRequest } = useFirestore();
  const [data, setData] = useState(undefined as undefined | RequestType);
  const { auth } = useFirebase();
  const [pageURL, setPageURL] = useState('');
  const [pageID, setPageID] = useState('');

  useEffect(() => {
    firebaseAnalytics.logEvent('request_details_page_visited');
    setPageURL(window.location.href);
    const parts = window.location.href.split('/');
    setPageID(parts[parts.length - 1]);
    prefillData();
    app.setBackButton(true);
    app.setTitle('Request Details');
  }, []);

  const prefillData = async () => {
    const existingRequest = await getRequest(params?.docId);
    if (typeof existingRequest === 'object') {
      setData(existingRequest as any);
    }
  };

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
        color="primary"
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
        // color="primary"
        onClick={handleEditClick}
        style={{ marginRight: '5px' }}
      >
        Edit
      </Button>
    );
  };

  const renderFieldValue = (
      value: string | undefined,
      style = {} as CSSProperties,
  ) => {
    return (
      <Typography variant="subtitle2" style={style}>
        {value || '-'}
      </Typography>
    );
  };

  return (
    <Container maxWidth="md">
      <Box marginBottom={5}>
        <Card>
          <CardContent>
            {data && (
              <Grid container spacing={2}>
                {data.requestTitle && (
                  <Grid item xs={12}>
                    <Typography variant="h4" component="h1" align="center">
                      {data.requestTitle}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="h6" component="h3">
                    <strong>
                      {data.requesterName} ({data.patientGender?.label || ''})
                    </strong>{' '}
                    of age: <strong>{data.patientAge || '-'}</strong>, blood
                    group:{' '}
                    <strong>
                      {data.patientBloodGroup?.label || '-'}
                    </strong> from{' '}
                    <strong>
                      {data.patientDistrict?.label}, {data.patientState?.label}
                    </strong>{' '}
                    requires <strong>{data.requestCategory?.label}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <List
                    subheader={<ListSubheader>More Details:</ListSubheader>}
                  >
                    <ListItem>
                      <ListItemText
                        id="description"
                        primary={data.requestDescription}
                        secondary="Details"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        id="phone-number"
                        primary={data.requesterContactNumber}
                        secondary="Phone number"
                      />
                    </ListItem>
                    {app.userInfo?.isAdmin ? <ListItem>
                      <ListItemText
                        id="email-id"
                        primary={data.requesterEmail}
                        secondary="Email Id"
                      />
                    </ListItem> : null}
                    <ListItem>
                      <ListItemText
                        id="created-at"
                        primary={parseTime(data.createdAt)}
                        secondary="Created At"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        id="last-updated-at"
                        primary={parseTime(data.updatedAt)}
                        secondary="Last Updated At"
                      />
                    </ListItem>
                  </List>
                </Grid>
                {data.requestStatus?.value === 'open' ? (
                  ( (data?.requesterEmail === auth?.user?.email) ||
                  (app.userInfo?.isAdmin) ) &&
                  (
                    <Grid item xs={12} md={6} spacing={2}>
                      {renderEditButton()}
                      {renderCloseButton()}
                    </Grid>
                  )
                ) : (
                  <>
                    {data?.donorName ? <Grid container>
                      <Grid item xs={6}>
                        {renderFieldValue('Donor Name')}
                      </Grid>
                      <Grid item xs={6}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          {renderFieldValue(data?.donorName, {
                            fontWeight: 600,
                          })}
                          <FavoriteIcon
                            color="secondary"
                            fontSize="small"
                            style={{ marginLeft: '5px' }}
                          />
                        </span>
                      </Grid>
                    </Grid> : null }

                    <Grid container>
                      <Grid item xs={6}>
                        {renderFieldValue('Status')}
                      </Grid>
                      <Grid item xs={6}>
                        {renderFieldValue('Closed', {
                          fontWeight: 600,
                        })}
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Box>
      {/* <Box>
        {data && (
          <Disqus
            url={pageURL}
            id={pageID}
            title={data.requestTitle}
            language="en"
          />
        )}
      </Box> */}
    </Container>
  );
};

// export default memo(withAuth(ViewRequest));
export default memo(ViewRequest);
