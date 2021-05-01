/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import useFirestore from 'src/hooks/useFirestore';
import useFirebase from 'src/hooks/useFirebase';
import { setUserInfo, useAppContext } from 'src/contexts/AppContext';
import { UserInfo } from 'src/types';

const useUser = () => {
  const { auth } = useFirebase();
  const { isCurrentUserAdmin } = useFirestore();
  const { dispatch, state: { userInfo } } = useAppContext();

  React.useEffect(() => {
    if (auth?.user?.email !== userInfo?.email) {
      storeUserInfo();
    }
  }, [auth?.user?.email]);

  const storeUserInfo = async () => {
    const isAdmin = await isCurrentUserAdmin();
    dispatch(setUserInfo({
      isAdmin,
      email: auth?.user?.email,
      displayName: auth?.user?.displayName,
    }));
  };

  return userInfo || ({} as UserInfo);
};

export default useUser;
