import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import AuthContainer from 'client/app/react/containers/auth';
import LoginContainer from 'client/app/react/containers/login';

const routes = (
  <Switch>
    <Route path="/admin" component={AuthContainer} exact />
    <Route path="/secrets" component={AuthContainer} exact />
    <Route path="/login" component={LoginContainer} exact />
    <Redirect to="/secrets" />
  </Switch>
);

export default routes;
