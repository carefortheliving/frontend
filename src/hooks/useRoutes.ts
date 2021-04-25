import { useLocation } from 'react-router-dom';

const useRoutes = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCreateRequest = location.pathname === '/request/create';
  const isLogin = location.pathname === '/login';

  return {
    isHome,
    isCreateRequest,
    isLogin,
  };
};

export default useRoutes;
