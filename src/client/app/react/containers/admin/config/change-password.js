import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-elemental';
import ChangePasswordModalContainer from 'client/app/react/containers/admin/change-password-modal';
import ConfigItem from 'client/app/react/components/admin/config-item';
import withToggleState from 'client/app/react/hoc/with-toggle-state';

/**
 * Admin configuration item for deleting all secrets.
 */
const ChangePasswordConfigContainer = ({ isVisible, showModal, hideModal }) => (
  <ConfigItem
    title="Change master decryption password"
    text={
      'Update the key used for encrypting and decrypting all of Vault\'s secrets. ' +
      'You will need to re-add all existing secrets.'
    }
  >
    <Button
      text="Change password"
      onClick={showModal}
    />

    {isVisible && (
      <ChangePasswordModalContainer onHide={hideModal} />
    )}
  </ConfigItem>
);

ChangePasswordConfigContainer.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default withToggleState({
  key: 'isVisible',
  enable: 'showModal',
  disable: 'hideModal',
})(ChangePasswordConfigContainer);
