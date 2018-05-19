import React from 'react';
import { Alert } from 'react-elemental';
import { SUCCESS_COLOR } from 'client/app/util/constants/color';

/**
 * Vault-stylized success alert.
 */
const SuccessAlert = (props) => (
  <Alert
    type="success"
    style={{ backgroundColor: SUCCESS_COLOR }}
    {...props}
  />
);

export default SuccessAlert;
