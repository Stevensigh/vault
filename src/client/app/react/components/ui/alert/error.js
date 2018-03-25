import React from 'react';
import { Alert } from 'react-elemental';

/**
 * Vault-stylized error alert.
 */
const ErrorAlert = (props) => (
  <Alert
    type="error"
    style={{ backgroundColor: 'rgba(167, 78, 78, 0.1)' }}
    {...props}
  />
);

export default ErrorAlert;
