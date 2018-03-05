import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Login from 'client/app/react/containers/login';
import Secrets from 'client/app/react/containers/secrets';

const routes = (
  <Switch>
    <Route path="/secrets" component={Secrets} exact />
    <Route path="/login" component={Login} />
    <Redirect to="/login" />
  </Switch>
);

export default routes;
