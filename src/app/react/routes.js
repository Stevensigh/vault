import React from 'react';
import { Switch, Route } from 'react-router';
import Container from 'app/react/containers/container';

const routes = (
  <Switch>
    <Route path="*" component={Container} />
  </Switch>
);

export default routes;
