import React, { useEffect } from 'react';
import { useAuth } from 'src/components/common/AuthProvider/View';
import { useHistory } from 'react-router-dom';
import { getLoginRoute } from '../RouterOutlet/routerUtils';

const withAuth = <T extends React.FC>(Component: T) => {
  const WithAuthHOC: React.FC<any> = ({ ...props }) => {
    const { user } = useAuth();
    const history = useHistory();

    const init = async () => {
      // setLoading(true);
      const authenticated = user && user.email;
      // setLoading(false);
      if (!authenticated) {
        // TODO: Somehow store original route and redirect back to it after login?
        history.replace(getLoginRoute());
      }
    };

    useEffect(() => {
      init();
    }, []);

    // if (loading) {
    //   return null;
    // }
    return <Component {...props} />;
  };

  return WithAuthHOC as T;
};

export default withAuth;
