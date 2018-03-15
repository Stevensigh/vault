import React from 'react';
import PropTypes from 'prop-types';
import { colors, Button, Text } from 'react-elemental';
import BaseModal from 'client/app/react/components/ui/base-modal';

/**
 * Presentational component for the admin delete modal.
 */
const DeleteSecretsModal = ({ alert, isLoading, onHide, onSubmit }) => (
  <BaseModal
    isLoading={isLoading}
    onHide={onHide}
    alert={alert}
    title="Delete all secrets"
    body={
      <div>
        <Text color="gray30" inline>
          This will permanently delete all secrets stored by Vault.
          Are you sure you want to continue?&nbsp;
        </Text>
        <Text color={colors.red} inline>
          This action cannot be undone.
        </Text>
      </div>
    }
    submit={
      <Button
        color={colors.red}
        text="Delete"
        onClick={onSubmit}
        disabled={isLoading}
      />
    }
  />
);

DeleteSecretsModal.propTypes = {
  alert: PropTypes.node,
  isLoading: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

DeleteSecretsModal.defaultProps = {
  alert: null,
};

export default DeleteSecretsModal;
