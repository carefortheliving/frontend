import { atom } from 'recoil';
import useGenericRecoilState from 'src/hooks/useGenericRecoilState';
import { UserInfo } from 'src/types';
import useFirestore from 'src/hooks/useFirestore';
import useFirebase from 'src/hooks/useFirebase';

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

  // TODO: export single object like dashboardStore
  const actions = {
    setBackButton,
    setTitle,
    loadUserInfo,
  };
  return [state, actions] as [typeof state, typeof actions];
};
