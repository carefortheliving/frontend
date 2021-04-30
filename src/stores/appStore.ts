import { atom } from 'recoil';
import useGenericRecoilState from 'src/hooks/useGenericRecoilState';
import { UserInfo } from 'src/types';

const appStore = atom({
  key: 'firebase',
  default: {
    backButton: false,
    title: 'Care for the Living',
    userInfo: undefined as UserInfo | undefined,
  },
  // dangerouslyAllowMutability: true,
});

export const useAppStore = () => {
  const [state, setState] = useGenericRecoilState(appStore);

  const setBackButton = (backButton: typeof state.backButton) => {
    setState({
      backButton,
    });
  };

  const setTitle = (title: typeof state.title) => {
    setState({
      title,
    });
  };

  const setUserInfo = (userInfo: typeof state.userInfo) => {
    setState({
      userInfo,
    });
  };

  const actions = {
    setBackButton,
    setTitle,
    setUserInfo,
  };
  return [state, actions] as [typeof state, typeof actions];
};
