/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo, FC } from 'react';
import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getHomeRoute } from 'src/components/common/RouterOutlet/routerUtils';
import useFirestore from 'src/hooks/useFirestore';
import {
  useAppContext,
  changeTitle,
  changeBackButton,
} from 'src/contexts/AppContext';
import useUser from 'src/hooks/useUser';
import GetAppIcon from '@material-ui/icons/GetApp';
import { downloadFile } from 'src/utils/commonUtils';

const useStyles = makeStyles((theme) => ({
  downloadButton: {
    cursor: 'pointer',
  },
}));

interface AdminPortalProps { }

const AdminPortal: FC<AdminPortalProps> = () => {
  const { dispatch } = useAppContext();
  const classes = useStyles();
  const history = useHistory();
  const { getRequests, getUsefulLinks } = useFirestore();
  const { isAdmin } = useUser();

  useEffect(() => {
    ensurePermissions();
    dispatch(changeBackButton(true));
    dispatch(changeTitle('Admin Portal'));
  }, []);

  const ensurePermissions = () => {
    if (!isAdmin) {
      history.push(getHomeRoute());
    }
  };

  const handleDownloadButtonClick = async () => {
    const requests = await getRequests({});
    const usefulLinks = await getUsefulLinks();
    downloadFile(JSON.stringify({ requests, usefulLinks }, null, 4), 'careforliving.json');
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={1}>
        <GetAppIcon className={classes.downloadButton} onClick={handleDownloadButtonClick}/>
      </Grid>
    </Container>
  );
};

export default memo(AdminPortal);
