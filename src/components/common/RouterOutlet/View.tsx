import * as React from 'react';
import { Suspense } from 'react';
import { Switch, Route } from 'react-router';
import AppLoader from '../AppLoader/View';

const Login = React.lazy(() => import('../../pages/Login/View'));
const Dashboard = React.lazy(() => import('../../pages/Dashboard/View'));
const CreateRequest = React.lazy(
    () => import('../../pages/CreateDonation/View'),
);
const ViewRequest = React.lazy(() => import('../../pages/ViewRequest/View'));
const CreateDonation = React.lazy(
    () => import('../../pages/CreateDonation/View'),
);
const ViewDonation = React.lazy(() => import('../../pages/ViewDonation/View'));
const SayThanks = React.lazy(() => import('../../pages/SayThanks/View'));
const About = React.lazy(() => import('../../pages/About/View'));
const AdminPortal = React.lazy(() => import('../../pages/AdminPortal/View'));

const RouterOutlet = (props) => {
  return (
    <Suspense fallback={<AppLoader />}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/request/create" component={CreateRequest} />
        <Route
          path="/request/edit/:docId"
          exact
          component={(props) => <CreateRequest isEdit={true} {...props} />}
        />
        <Route path="/request/view/:docId" exact component={ViewRequest} />
        <Route path="/donation/create" component={CreateDonation} />
        <Route
          path="/donation/edit/:docId"
          exact
          component={(props) => <CreateDonation isEdit={true} {...props} />}
        />
        <Route path="/donation/view/:docId" exact component={ViewDonation} />
        <Route path="/thank/:docId" exact component={SayThanks} />
        <Route path="/about" exact component={About} />
        <Route path="/admin" exact component={AdminPortal} />
      </Switch>
    </Suspense>
  );
};

export default RouterOutlet;
