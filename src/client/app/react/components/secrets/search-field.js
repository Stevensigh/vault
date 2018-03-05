import React from 'react';
import PropTypes from 'prop-types';
import { colors, TextField } from 'react-elemental';
import Search from 'react-icons/lib/md/search';

/**
 * Field for filtering displayed secrets with a text search.
 */
const SearchField = ({ value, onChange }) => (
  <div>
    <TextField
      placeholder="Search for a secret..."
      value={value}
      onChange={onChange}
      style={{
        boxSizing: 'border-box',
        color: colors.gray10,
        fontSize: '20px',
        paddingLeft: '30px',
      }}
      secondary
    />
    <Search
      style={{
        color: colors.gray30,
        marginLeft: '4px',
        marginTop: '-52px',
        position: 'relative',
      }}
    />
  </div>
);

SearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchField;
