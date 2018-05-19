import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'react-elemental';

/**
 * Header in the secrets listing describing metadata about the fetched secrets.
 */
const SecretsMeta = ({ numSecrets, onAddClick }) => (
  <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
    <div>
      <Text color="gray50" bold inline>
        {numSecrets}
      </Text>
      <Text color="gray60" inline>
        &nbsp;matching secret{numSecrets === 1 ? '' : 's'}
      </Text>
    </div>

    <div>
      <Button
        size="gamma"
        text="Add new"
        onClick={onAddClick}
      />
    </div>
  </div>
);

SecretsMeta.propTypes = {
  numSecrets: PropTypes.number.isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default SecretsMeta;
