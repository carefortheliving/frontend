import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { Suspense } from 'react';
import { Switch, Route } from 'react-router';
import AppLoader from '../AppLoader/View';

const Login = React.lazy(() => import('../../pages/Login/View'));
const Feed = React.lazy(() => import('../../pages/Feed/View'));

const RouterOutlet = (props) => {
  return (
  <Suspense fallback={<AppLoader />}>
    <Switch>
      <Route path="/" component={Feed} />
      <Route path="/login" component={Login} />
    </Switch>
  </Suspense>);
};

export default RouterOutlet;
