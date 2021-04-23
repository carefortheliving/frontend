import { useLocation } from 'react-router-dom';

const useRoutes = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return {
    isHome,
  }
};

export default useRoutes;
