import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withResource } from 'supercharged/client';
import DeleteSecretsModal from 'client/app/react/components/admin/modal/delete-secrets';
import ErrorAlert from 'client/app/react/components/ui/alert/error';

/**
 * Resource wrapper for the delete modal.
 */
class DeleteSecretsModalContainer extends Component {
  static propTypes = {
    deleteSecrets: PropTypes.shape({
      err: PropTypes.object,
      invoke: PropTypes.func.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  handleSubmit = (evt) => {
    const { deleteSecrets, onSuccess } = this.props;

    evt.preventDefault();

    deleteSecrets.invoke(null, (err) => !err && onSuccess());
  };

  render() {
    const { deleteSecrets: { isLoaded, err }, onCancel } = this.props;

    return (
      <DeleteSecretsModal
        alert={err && (
          <ErrorAlert
            size="beta"
            title="Error"
            message={err.message}
          />
        )}
        isLoading={!isLoaded}
        onHide={onCancel}
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
