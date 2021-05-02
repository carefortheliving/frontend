/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo, FC, CSSProperties } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import {
  getEditDonationRoute,
  getSayThanksRoute,
} from 'src/components/common/RouterOutlet/routerUtils';
import useFirestore from 'src/hooks/useFirestore';
import useFirebase from 'src/hooks/useFirebase';
import { DonationType } from 'src/types';
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

interface ViewDonationProps {}

const ViewDonation: FC<ViewDonationProps> = () => {
  const app = useAppStore();
  const history = useHistory();
  const params = useParams();
  const { getDonation } = useFirestore();
  const [data, setData] = useState(undefined as undefined | DonationType);
  const { auth } = useFirebase();
  const [pageURL, setPageURL] = useState('');
  const [pageID, setPageID] = useState('');

  useEffect(() => {
    firebaseAnalytics.logEvent('donation_details_page_visited');
    setPageURL(window.location.href);
    const parts = window.location.href.split('/');
    setPageID(parts[parts.length - 1]);
    prefillData();
    app.setBackButton(true);
    app.setTitle('Donation Details');
  }, []);

  const prefillData = async () => {
    const existingDonation = await getDonation(params?.docId);
    if (typeof existingDonation === 'object') {
      setData(existingDonation as any);
    }
  };

  const handleCloseClick = () => {
    history.push(getSayThanksRoute(params?.docId));
  };

  const handleEditClick = () => {
    history.push(getEditDonationRoute(params?.docId));
  };

  const renderCloseButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={handleCloseClick}
        // style={{ marginRight: "10px" }}
      >
        Mark as Culminated
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
                {data.donationTitle && (
                  <Grid item xs={12}>
                    <Typography variant="h4" component="h1" align="center">
                      {data.donationTitle}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="h6" component="h3">
                    <strong>
                      {data.donorName} ({data.donorGender?.label || ''})
                    </strong>{' '}
                    of age: <strong>{data.donorAge || '-'}</strong>, blood
                    group:{' '}
                    <strong>
                      {data.donorBloodGroup?.label || '-'}
                    </strong> from{' '}
                    <strong>
                      {data.donorDistrict?.label}, {data.donorState?.label}
                    </strong>{' '}
                    is willing to donate <strong>{data.donationCategory?.label}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <List
                    subheader={<ListSubheader>More Details:</ListSubheader>}
                  >
                    <ListItem>
                      <ListItemText
                        id="description"
                        primary={data.donationDescription}
                        secondary="Details"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        id="phone-number"
                        primary={data.donorContactNumber}
                        secondary="Phone number"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        id="covideRecoveryStatus"
                        primary={parseTime(data.covidRecoveryDate)}
                        secondary="Covide Recovery Date"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        id="antibodyTestStatus"
                        primary={data.antibodyTestStatus?.label}
                        secondary="Antibody Test Done?"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        id="vaccinationStatus"
                        primary={data.vaccinationStatus?.label}
                        secondary="Vaccination Done?"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        id="medicalComplication"
                        primary={data.medicalComplication}
                        secondary="Medication Complication"
                      />
                    </ListItem>
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
                {data.donationStatus?.value === 'open' ? (
                  ( (data?.donorEmail === auth?.user?.email) ||
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
            title={data.donationTitle}
            language="en"
          />
        )}
      </Box> */}
    </Container>
  );
};

export default memo(ViewDonation);
