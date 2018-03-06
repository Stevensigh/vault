import React from 'react';
import PropTypes from 'prop-types';
import { Spacing } from 'react-elemental';
import withToggleState from 'client/app/react/hoc/with-toggle-state';

/**
 * UI wrapper component for segmenting multiple children nodes into a single visual block.
 */
const Box = ({ isHover, handleMouseEnter, handleMouseLeave, children, ...props }) => (
  <Spacing
    style={{
      backgroundColor: 'rgb(18, 18, 18)',
      borderRadius: '3px',
      boxShadow: `4px 4px 10px 0px rgba(0, 0, 0, ${isHover ? 0.17 : 0.1})`,
      transition: 'all 0.25s ease',
    }}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
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
  isHover: PropTypes.bool.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default withToggleState({
  key: 'isHover',
  enable: 'handleMouseEnter',
  disable: 'handleMouseLeave',
})(Box);
