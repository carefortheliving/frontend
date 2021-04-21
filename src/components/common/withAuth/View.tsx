import * as React from "react";
import { getLoginRoute } from "../RouterOutlet/routerUtils";

const withAuth = <T extends React.FC>(Component: T) => {
  const WithAuthHOC: React.FC<any> = ({
    ...props
  }) => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      init();
    }, []);

    const init = async () => {
      setLoading(true);
      const authenticated = true;
      // TODO: Check if authenticated
      setLoading(false);
      if (!authenticated) {
        // TODO: Somehow store original route and redirect back to it after login?
        return (window.location.href = getLoginRoute());
      }
      return;
    }

    if (loading) {
      return null;
    }
    return <Component {...props} />;
  };

  return WithAuthHOC as T;
};

export default withAuth;
