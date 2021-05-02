/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  CircularProgress,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import CancelIcon from '@material-ui/icons/Cancel';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { UsefulLink } from 'src/types';
import HeaderCarousel from './HeaderCarousel';
import LinkCard from './LinkCard';
import useModel from './model';
import RequestCard from './RequestCard';
import DonationCard from './DonationCard';
import RequestFilters from './RequestFilters';
import DonationFilters from './DonationFilters';
import { useStyles } from './styles';
import useBreakpoint from 'src/hooks/useBreakpoint';
import InfiniteGrid, { InfiniteGridCellProps } from 'src/components/common/InfiniteGrid/View';
import DashboardTabs from './DashboardTabs';

const Dashboard = () => {
  const classes = useStyles();
  const model = useModel();
  const isUpSm = useBreakpoint('sm');
  const {
    handleRequestCardClick,
    handleDonationCardClick,
    loading,
    isAdmin,
    email,
    activeTab,
    setTab,
    usefulLinks,
    loadLinks,
    requests,
    donations,
  } = model;

  const renderNoData = () => {
    return (
      <Container style={{ marginTop: '20px' }}>
        <Alert severity="info">
          <AlertTitle>No {activeTab.key === 'donations' ? 'Donation' : 'Request'} created yet</AlertTitle>
          Click on the <strong>{activeTab.key === 'donations' ? 'Donate' : 'Create Request'}</strong> button to get started!
        </Alert>
      </Container>
    );
  };

  const renderHeader = () => {
    return (
      <Container maxWidth="lg">
        <HeaderCarousel />
      </Container>
    );
  };

  const getRowHeight = () => {
    switch (activeTab.key) {
      case 'useful_links':
        return 280;
      case 'donations':
      case 'open_requests':
      case 'closed_requests':
      case 'my_requests':
      default:
        return 400;
    }
  };

  const getGridData = () => {
    switch (activeTab.key) {
      case 'useful_links':
        return usefulLinks;
      case 'donations':
        return donations;
      case 'open_requests':
      case 'closed_requests':
      case 'my_requests':
        return requests;
      default:
        return [];
    }
  };

  const gridColumnCount = isUpSm ? (activeTab.key === 'open_requests' || activeTab.key === 'donations' ? 3 : 4) : 1;
  const renderCell = (props: InfiniteGridCellProps) => {
    const { columnIndex, rowIndex, style } = props;
    const index = rowIndex * gridColumnCount + columnIndex;
    const data = getGridData()?.[index] as any;
    return data ? <div style={{ ...style, padding: '16px' }} key={`cell-${index}`}>
      {(() => {
        switch (activeTab.key) {
          case 'useful_links':
            return <LinkCard
              prefillData={data || {
                name: 'Loading more ...',
              }}
              onReloadRequested={loadLinks} />;
          case 'donations':
            return <DonationCard
              key={data.id}
              data={data}
              onClick={handleDonationCardClick} />;
          case 'open_requests':
          case 'closed_requests':
          case 'my_requests':
            return <RequestCard
              key={data.id}
              data={data}
              onClick={handleRequestCardClick} />;
          default:
            return [];
        }
      })()}
    </div> : null;
  };

  const renderContent = () => {
    return (
      <Grid item md={activeTab.key === 'open_requests' || activeTab.key === 'donations' ? 9 : 12}>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {loading ? (
              <Box
                style={{
                  width: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  margin: 'auto',
                }}
              >
                <CircularProgress
                  style={{ margin: 'auto', marginTop: '100px' }}
                />
              </Box>
            ) : (getGridData()?.length ? <InfiniteGrid
              loadMoreItems={async (s, e) => {
              }}
              renderCell={renderCell}
              columnCount={gridColumnCount}
              columnWidth={isUpSm ? 300 : 350}
              gridHeight={560}
              isItemLoaded={(idx) => idx < 10}
              itemCount={getGridData()?.length}
              rowHeight={getRowHeight()} /> : renderNoData())}
          </Grid>
        </Container>
      </Grid>
    );
  };

  return (
    <>
      <div className={classes.heroContent}
        style={{
          padding: isUpSm ? '64px 0px 48px' : '40px 0px 20px',
        }}>{renderHeader()}</div>
      <Container>
        <Grid item sm={12}>
          <DashboardTabs activeTab={activeTab} setTab={setTab}
          />
        </Grid>
        <Grid container spacing={4}>
          {activeTab.key === 'open_requests' ?
            <RequestFilters /> :
            null}
          {activeTab.key === 'donations' ?
            <DonationFilters /> :
            null}
          {renderContent()}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
