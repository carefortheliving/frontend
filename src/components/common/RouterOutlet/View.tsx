import * as React from 'react';
import { Suspense } from 'react';
import { Switch, Route } from 'react-router';
import AppLoader from '../AppLoader/View';

const Login = React.lazy(() => import('../../pages/Login/View'));
const Dashboard = React.lazy(() => import('../../pages/Dashboard/View'));
const CreateRequest = React.lazy(
  () => import('../../pages/CreateRequest/View'),
);
const ViewRequest = React.lazy(() => import('../../pages/ViewRequest/View'));
const SayThanks = React.lazy(() => import('../../pages/SayThanks/View'));
const About = React.lazy(() => import('../../pages/About/View'));

const RouterOutlet = (props) => (
  <Suspense fallback={<AppLoader />}>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/request/create" component={CreateRequest} />
      <Route
        path="/request/edit/:docId"
        exact
        component={(props) => <CreateRequest isEdit {...props} />}
      />
      <Route path="/request/view/:docId" exact component={ViewRequest} />
      <Route path="/thank/:docId" exact component={SayThanks} />
      <Route path="/about" exact component={About} />
    </Switch>
  </Suspense>
);

export default RouterOutlet;
