import * as React from "react";
import { getLoginRoute } from "../RouterOutlet/routerUtils";
import { useAuth } from "src/components/common/AuthProvider/View";
import { useHistory } from "react-router-dom";

const withAuth = <T extends React.FC>(Component: T) => {
  const WithAuthHOC: React.FC<any> = ({ ...props }) => {
    // const [loading, setLoading] = React.useState(true);
    const { user } = useAuth();
    const history = useHistory();

    React.useEffect(() => {
      init();
    }, []);

    const init = async () => {
      // setLoading(true);
      const authenticated = user && user.email;
      // setLoading(false);
      if (!authenticated) {
        // TODO: Somehow store original route and redirect back to it after login?
        history.replace(getLoginRoute());
      }
    };

    // if (loading) {
    //   return null;
    // }
    return <Component {...props} />;
  };

  return WithAuthHOC as T;
};

export default withAuth;
