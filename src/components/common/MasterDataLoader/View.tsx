import * as React from 'react';
import { useAppStore } from 'src/stores/appStore';
import useFirebase from 'src/hooks/useFirebase';

const MasterDataLoader = () => {
  const { auth } = useFirebase();
  const app = useAppStore();

  React.useEffect(() => {
    app.loadUserInfo();
  }, [auth?.user?.email]);

  return null;
};


export default MasterDataLoader;
