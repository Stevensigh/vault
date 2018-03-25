import React from 'react';
import { Alert } from 'react-elemental';

/**
 * Vault-stylized success alert.
 */
const SuccessAlert = (props) => (
  <Alert
    type="success"
    style={{ backgroundColor: 'rgba(60, 86, 62, 0.2)' }}
    {...props}
  />
);

export default SuccessAlert;
