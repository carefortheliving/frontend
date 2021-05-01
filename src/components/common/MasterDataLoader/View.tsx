import * as React from 'react';
import { useAppStore } from 'src/stores/appStore';
import useFirebase from 'src/hooks/useFirebase';

const MasterDataLoader = () => {
  const { auth } = useFirebase();
  const [app, appActions] = useAppStore();

  React.useEffect(() => {
    appActions.loadUserInfo();
  }, [auth?.user?.email]);

  return null;
};


export default MasterDataLoader;
