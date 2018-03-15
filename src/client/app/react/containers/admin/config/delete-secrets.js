import React from 'react';
import PropTypes from 'prop-types';
import { colors, Button } from 'react-elemental';
import DeleteModalContainer from 'client/app/react/containers/admin/delete-modal';
import ConfigItem from 'client/app/react/components/admin/config-item';
import withToggleState from 'client/app/react/hoc/with-toggle-state';

/**
 * Admin configuration item for deleting all secrets.
 */
const DeleteSecretsConfigContainer = ({ isVisible, showModal, hideModal }) => (
  <ConfigItem
    title="Delete all secrets"
    text="Delete all encrypted secrets currently stored by Vault."
  >
    <Button
      color={colors.red}
      text="Delete all secrets"
      onClick={showModal}
    />

    {isVisible && (
      <DeleteModalContainer onHide={hideModal} />
    )}
  </ConfigItem>
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
