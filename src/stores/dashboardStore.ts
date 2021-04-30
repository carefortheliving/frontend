import { atom } from 'recoil';
import { ExistingRequestType, UsefulLink } from 'src/types';
import useGenericRecoilState from 'src/hooks/useGenericRecoilState';

const dashboardStore = atom({
  key: 'firebase',
  default: {
    requests: [] as ExistingRequestType[],
    links: [] as UsefulLink[],
  },
});

export const useDashboardStore = () => {
  const [state, setState] = useGenericRecoilState(dashboardStore);

  const loadRequests = () => {
    setState({
      requests: [],
    });
  };

  const loadLinks = () => {
    setState({
      links: [],
    });
  };

  const actions = {
    loadRequests,
    loadLinks,
  };
  return [state, actions] as [typeof state, typeof actions];
};
