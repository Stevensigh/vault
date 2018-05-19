import React from 'react';
import { Alert } from 'react-elemental';
import { WARN_COLOR } from 'client/app/util/constants/color';

/**
 * Vault-stylized warning alert.
 */
const WarnAlert = (props) => (
  <Alert
    type="warn"
    style={{ backgroundColor: WARN_COLOR }}
    {...props}
  />
);

export default WarnAlert;
