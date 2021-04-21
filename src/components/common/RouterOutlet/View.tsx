import * as React from "react";
import { Suspense } from "react";
import { Switch, Route } from "react-router";
import AppLoader from "../AppLoader/View";

const Login = React.lazy(() => import("../../pages/Login/View"));
const Dashboard = React.lazy(() => import("../../pages/Dashboard/View"));
const CreateRequest = React.lazy(
  () => import("../../pages/CreateRequest/View")
);
const ViewRequest = React.lazy(() => import("../../pages/ViewRequest/View"));
const MyRequest = React.lazy(() => import("../../pages/MyRequest/View"));

const RouterOutlet = (props) => {
  return (
    <Suspense fallback={<AppLoader />}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/request/create" component={CreateRequest} />
        <Route path="/request/view" component={ViewRequest} />
        <Route path="/request/me" component={MyRequest} />
      </Switch>
    </Suspense>
  );
};

export default RouterOutlet;
