import React from 'react';
import PropTypes from 'prop-types';
import { colors, Button, Text } from 'react-elemental';
import BaseModal from 'client/app/react/components/ui/base-modal';

/**
 * Presentational component for deleting a specific secret by name.
 */
const DeleteSecretModal = ({ name, alert, isLoading, onHide, onSubmit }) => (
  <BaseModal
    isLoading={isLoading}
    onHide={onHide}
    alert={alert}
    title="Delete secret"
    body={
      <div>
        <Text color="gray30" inline>
          This will permanently delete the secret&nbsp;
        </Text>
        <Text color="gray30" bold inline>
          {name}
        </Text>
        <Text color="gray30" inline>
          . Are you sure you want to continue?
        </Text>
      </div>
    }
    submit={
      <Button
        text="Delete"
        color={colors.red}
        disabled={isLoading}
        onClick={onSubmit}
      />
    }
  />
);

DeleteSecretModal.propTypes = {
  name: PropTypes.string.isRequired,
  alert: PropTypes.node,
  isLoading: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

DeleteSecretModal.defaultProps = {
  alert: null,
};

export default DeleteSecretModal;
