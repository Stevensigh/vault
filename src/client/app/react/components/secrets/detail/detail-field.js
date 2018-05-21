/* eslint-disable react/no-array-index-key */

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

    {text && text.split('\n').map((textLine, idx) => (
      <React.Fragment key={idx}>
        <Text size="20px" color="gray20" inline>
          {textLine}
        </Text>
        <br />
      </React.Fragment>
    ))}

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
