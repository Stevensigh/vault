import React from 'react';
import { Switch, Route } from 'react-router';
import Secrets from 'client/app/react/containers/secrets';

const routes = (
  <Switch>
    <Route path="*" component={Secrets} />
  </Switch>
);

export default routes;
