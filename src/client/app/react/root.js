import React from 'react';
import { colors, Spacing } from 'react-elemental';
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

    <Spacing size="80px" style={{ margin: 'auto', maxWidth: '1200px' }} right left padding>
      {routes}
    </Spacing>
  </div>
);

export default Root;
