/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { getLoginRoute } from "../RouterOutlet/routerUtils";
import { useAuth } from "src/components/common/AuthProvider/View";
import { useHistory } from "react-router-dom";

const withAuth = <T extends React.FC>(Component: T) => {
  const WithAuthHOC: React.FC<any> = ({ ...props }) => {
    const { user } = useAuth();
    const history = useHistory();

    React.useEffect(() => {
      init();
    }, []);

    const init = async () => {
      const authenticated = user && user.email;
      if (!authenticated) {
        // TODO: Somehow store original route and redirect back to it after login?
        history.replace(getLoginRoute());
      }
    };
    return <Component {...props} />;
  };

  return WithAuthHOC as T;
};

export default withAuth;
