import { atom } from 'recoil';
import useGenericRecoilState from 'src/hooks/useGenericRecoilState';
import { UserInfo } from 'src/types';
import useFirestore from 'src/hooks/useFirestore';
import useFirebase from 'src/hooks/useFirebase';
import { useEffect } from 'react';

const appStore = atom({
  key: 'app',
  default: {
    backButton: false,
    title: 'Care for the Living',
    userInfo: undefined as UserInfo | undefined,
  },
  // dangerouslyAllowMutability: true,
});

export const useAppStore = () => {
  const [state, setState] = useGenericRecoilState(appStore);
  const { isCurrentUserAdmin } = useFirestore();
  const { auth } = useFirebase();

  useEffect(() => {
    // DANGER!
    // Stores can't have effects!
  }, []);

  const setBackButton = async (backButton: typeof state.backButton) => {
    setState({
      backButton,
    });
  };

  const setTitle = async (title: typeof state.title) => {
    setState({
      title,
    });
  };

  const loadUserInfo = async () => {
    if (auth?.user?.email === state.userInfo?.email) return;
    const isAdmin = await isCurrentUserAdmin();
    setState({
      userInfo: {
        isAdmin,
        email: auth?.user?.email,
        displayName: auth?.user?.displayName,
      },
    });
  };

  return {
    ...state,
    setBackButton,
    setTitle,
    loadUserInfo,
  };
};
