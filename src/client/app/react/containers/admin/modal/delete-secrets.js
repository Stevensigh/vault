import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-elemental';
import { withResource } from 'supercharged/client';
import DeleteSecretsModal from 'client/app/react/components/admin/modal/delete-secrets';

/**
 * Resource wrapper for the delete modal.
 */
class DeleteSecretsModalContainer extends Component {
  static propTypes = {
    deleteSecrets: PropTypes.shape({
      err: PropTypes.object,
      invoke: PropTypes.func.isRequired,
    }).isRequired,
    onHide: PropTypes.func.isRequired,
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.props.deleteSecrets.invoke();
  };

  render() {
    const { onHide, deleteSecrets: { isLoaded, err, data } } = this.props;

    const alert = (() => {
      if (err) {
        return (
          <Alert
            type="error"
            size="beta"
            title="Error"
            message={err.message}
          />
        );
      }

      if (data) {
        return (
          <Alert
            type="success"
            size="beta"
            title="Success"
            message="All Vault secrets have been successfully deleted."
          />
        );
      }

      return null;
    })();

    return (
      <DeleteSecretsModal
        alert={alert}
        isLoading={!isLoaded}
        onHide={onHide}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default withResource({
  key: 'deleteSecrets',
  method: 'DELETE',
  endpoint: '/api/secrets',
  invokeOnMount: false,
})(DeleteSecretsModalContainer);
