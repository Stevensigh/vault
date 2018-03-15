import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'react-elemental';
import KeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import DeleteSecretsModalContainer from 'client/app/react/containers/admin/modal/delete-secrets';
import ConfigItem from 'client/app/react/components/admin/config-item';
import withToggleState from 'client/app/react/hoc/with-toggle-state';

/**
 * Admin configuration item for deleting all secrets.
 */
const DeleteSecretsConfigContainer = ({ isVisible, showModal, hideModal }) => (
  <div>
    <div style={{ cursor: 'pointer' }} onClick={showModal} tabIndex={0}>
      <ConfigItem
        title="Delete all secrets"
        text="Delete all encrypted secrets currently stored by Vault."
      >
        <KeyboardArrowRight style={{ color: colors.gray40 }} />
      </ConfigItem>
    </div>

    {isVisible && (
      <DeleteSecretsModalContainer onHide={hideModal} />
    )}
  </div>
);

DeleteSecretsConfigContainer.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default withToggleState({
  key: 'isVisible',
  enable: 'showModal',
  disable: 'hideModal',
})(DeleteSecretsConfigContainer);
