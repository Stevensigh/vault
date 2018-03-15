import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text } from 'react-elemental';
import Box from 'client/app/react/components/ui/box';

/**
 * Describes a single configuration entry in the admin settings.
 */
const ConfigItem = ({ title, text, children }) => (
  <Box>
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ maxWidth: '500px' }}>
        <Spacing size="small" bottom>
          <Text size="kilo" color="gray50" style={{ letterSpacing: '1px' }} uppercase bold>
            {title}
          </Text>
        </Spacing>

        <Text color="gray10">
          {text}
        </Text>
      </div>

      <Spacing left>
        {children}
      </Spacing>
    </div>
  </Box>
);

ConfigItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ConfigItem;
