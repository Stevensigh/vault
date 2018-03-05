import React from 'react';
import PropTypes from 'prop-types';
import { Spacing } from 'react-elemental';

/**
 * UI wrapper component for segmenting multiple children nodes into a single visual block.
 */
const Box = ({ children, ...props }) => (
  <Spacing
    style={{ backgroundColor: 'rgb(18, 18, 18)', borderRadius: '3px' }}
    top
    right
    bottom
    left
    padding
    {...props}
  >
    {children}
  </Spacing>
);

Box.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Box;
