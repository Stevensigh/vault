import React from 'react';
import PropTypes from 'prop-types';
import { colors, Spacing, Text } from 'react-elemental';
import KeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';

/**
 * Single secret result entry in the list of all secrets.
 */
const Secret = ({ name, identity }) => (
  <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
    <div>
      <div>
        <Text size="epsilon" color="gray10" bold>
          {name}
        </Text>

        {identity && (
          <Spacing size="micro" top>
            <Text size="kilo" color="gray40">
              {identity}
            </Text>
          </Spacing>
        )}
      </div>
    </div>

    <Spacing size="tiny" top right left bottom padding>
      <KeyboardArrowRight style={{ color: colors.gray40 }} />
    </Spacing>
  </div>
);

Secret.propTypes = {
  name: PropTypes.string.isRequired,
  identity: PropTypes.string,
};

Secret.defaultProps = {
  identity: null,
};

export default Secret;
