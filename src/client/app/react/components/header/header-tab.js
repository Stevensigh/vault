import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text } from 'react-elemental';

/**
 * Single tab in the header.
 */
const HeaderTab = ({ isSelected, text }) => (
  <Spacing top bottom>
    <Spacing size="small" right left>
      <Text
        size="kilo"
        color="gray10"
        bold={isSelected}
        style={{
          opacity: isSelected ? 1 : 0.7,
          transition: 'opacity 0.15s ease',
        }}
        uppercase
      >
        {text}
      </Text>
    </Spacing>
  </Spacing>
);

HeaderTab.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default HeaderTab;
