import React from 'react';
import { Alert } from 'react-elemental';

/**
 * Vault-stylized warning alert.
 */
const WarnAlert = (props) => (
  <Alert
    type="warn"
    style={{ backgroundColor: 'rgba(108, 98, 70, 0.2)' }}
    {...props}
  />
);

export default WarnAlert;
