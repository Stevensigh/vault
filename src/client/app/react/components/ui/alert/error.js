import React from 'react';
import { Alert } from 'react-elemental';
import { ERROR_COLOR } from 'client/app/util/constants/color';

/**
 * Vault-stylized error alert.
 */
const ErrorAlert = (props) => (
  <Alert
    type="error"
    style={{ backgroundColor: ERROR_COLOR }}
    {...props}
  />
);

export default ErrorAlert;
