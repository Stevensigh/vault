import React from 'react';
import routes from 'client/app/react/routes';
import ToastsContainer from 'client/app/react/containers/ui/toasts';

/**
 * Application root.
 */
const Root = () => (
  <div>
    {routes}

    <ToastsContainer />
  </div>
);

export default Root;
