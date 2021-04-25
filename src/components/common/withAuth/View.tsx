/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/components/common/AuthProvider/View';

import { getLoginRoute } from '../RouterOutlet/routerUtils';

const withAuth = <T extends React.FC>(Component: T) => {
	const WithAuthHOC: React.FC<any> = ({ ...props }) => {
		const { user } = useAuth();
		const history = useHistory();

		React.useEffect(() => {
			init();
		}, []);

		const init = async () => {
			const authenticated = user?.uid;
			if (!authenticated) {
				history.replace(getLoginRoute());
			}
		};
		return <Component {...props} />;
	};

	return WithAuthHOC as T;
};

export default withAuth;
