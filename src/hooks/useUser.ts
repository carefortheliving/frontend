/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import useFirestore from 'src/hooks/useFirestore';
import useFirebase from 'src/hooks/useFirebase';
import { useAppStore } from 'src/stores/appStore';
import { UserInfo } from 'src/types';

const useUser = () => {
  const { auth } = useFirebase();
  const { isCurrentUserAdmin } = useFirestore();
  const [app, appActions] = useAppStore();

  React.useEffect(() => {
    if (auth?.user?.email !== app.userInfo?.email) {
      storeUserInfo();
    }
  }, [auth?.user?.email]);

  const storeUserInfo = async () => {
    const isAdmin = await isCurrentUserAdmin();
    appActions.setUserInfo({
      isAdmin,
      email: auth?.user?.email,
      displayName: auth?.user?.displayName,
    });
  };

  return app.userInfo || ({} as UserInfo);
};

export default useUser;
