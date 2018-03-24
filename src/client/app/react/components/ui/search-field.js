import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { colors, sizes } from 'react-elemental';
import Search from 'react-icons/lib/md/search';
import withToggleState from 'client/app/react/hoc/with-toggle-state';

/**
 * Text field component for searches.
 */
const SearchField = ({
  isHover,
  isFocus,
  handleMouseOver,
  handleMouseOut,
  handleFocus,
  handleBlur,
  style: overrides,
  ...props
}) => {
  const alpha = (() => {
    if (isFocus) {
      return 0.08;
    }
    if (isHover) {
      return 0.06;
    }
    return 0.05;
  })();

  return (
    <div style={{ position: 'relative' }}>
      <Search
        style={{
          color: `rgba(255, 255, 255, ${2 * alpha})`,
          left: '12px',
          position: 'absolute',
          top: '12px',
        }}
      />

      <input
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          backgroundColor: `rgba(255, 255, 255, ${alpha})`,
          border: 0,
          borderRadius: '3px',
          boxShadow: `4px 4px 7px 0px rgba(0, 0, 0, ${2 * alpha})`,
          boxSizing: 'border-box',
          color: colors.gray20,
          fontFamily: 'primary--regular',
          fontSize: sizes.kilo,
          padding: '12px 12px 12px 40px',
          transition: 'all 0.2s ease',
          ...overrides,
        }}
        {...props}
      />
    </div>
  );
};

SearchField.propTypes = {
  isHover: PropTypes.bool.isRequired,
  isFocus: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  style: PropTypes.object,
};

SearchField.defaultProps = {
  style: {},
};

export default compose(
  withToggleState({ key: 'isHover', enable: 'handleMouseOver', disable: 'handleMouseOut' }),
  withToggleState({ key: 'isFocus', enable: 'handleFocus', disable: 'handleBlur' }),
)(SearchField);
