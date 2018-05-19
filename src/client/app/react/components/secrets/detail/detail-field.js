import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text } from 'react-elemental';

/**
 * Represents a listing of a single field or property of a secret listing.
 */
const DetailField = ({ title, text, children }) => (
  <div>
    <Spacing size="tiny" bottom>
      <Text size="kilo" color="gray50" style={{ letterSpacing: '1px' }} uppercase bold>
        {title}
      </Text>
    </Spacing>

    {text && (
      <Text size="20px" color="gray20">
        {text}
      </Text>
    )}

    {children}
  </div>
);

DetailField.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.node,
};

DetailField.defaultProps = {
  text: null,
  children: null,
};

export default DetailField;
