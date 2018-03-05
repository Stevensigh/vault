import React from 'react';
import PropTypes from 'prop-types';
import { Spacing } from 'react-elemental';

/**
 * Global layout container offering consistent padding and margins around main page content.
 */
const Container = ({ children, ...props }) => (
  <Spacing
    size="80px"
    style={{ margin: 'auto', maxWidth: '1200px' }}
    right
    left
    padding
    {...props}
  >
    {children}
  </Spacing>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
