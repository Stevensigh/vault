import React from 'react';
import { colors } from 'react-elemental';
import routes from 'client/app/react/routes';

/**
 * Application root.
 */
const Root = () => (
  <div>
    <div
      style={{
        backgroundColor: colors.gray95,
        height: '100%',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: -1,
      }}
    />

    {routes}
  </div>
);

export default Root;
