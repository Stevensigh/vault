import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'react-elemental';
import KeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import ChangePasswordModalContainer from 'client/app/react/containers/admin/modal/change-password';
import ConfigItem from 'client/app/react/components/admin/config-item';
import withToggleState from 'client/app/react/hoc/with-toggle-state';

/**
 * Admin configuration item for deleting all secrets.
 */
const ChangePasswordConfigContainer = ({ isVisible, showModal, hideModal }) => (
  <div>
    <div style={{ cursor: 'pointer' }} onClick={showModal} tabIndex={0}>
      <ConfigItem
        title="Change master decryption password"
        text={
          'Update the key used for encrypting and decrypting all of Vault\'s secrets. ' +
          'You will need to re-add all existing secrets.'
        }
      >
        <KeyboardArrowRight style={{ color: colors.gray40 }} />
      </ConfigItem>
    </div>

    {isVisible && (
      <ChangePasswordModalContainer onHide={hideModal} />
    )}
  </div>
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
