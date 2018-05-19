import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withResource } from 'supercharged/client';
import DeleteSecretModal from 'client/app/react/components/secrets/detail/delete-secret-modal';
import ErrorAlert from 'client/app/react/components/ui/alert/error';

/**
 * Resource wrapper for deleting a specific secret by name.
 */
class DeleteSecretModalContainer extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    deleteSecret: PropTypes.shape({
      err: PropTypes.object,
      invoke: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleSubmit = (evt) => {
    const { deleteSecret, onSuccess } = this.props;

    evt.preventDefault();

    deleteSecret.invoke(null, (err) => !err && onSuccess());
  };

  render() {
    const { name, onCancel, deleteSecret: { err, isLoaded } } = this.props;

    return (
      <DeleteSecretModal
        name={name}
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
  key: 'deleteSecret',
  method: 'DELETE',
  endpoint: '/api/secrets',
  data: ({ id }) => ({ id }),
  invokeOnMount: false,
})(DeleteSecretModalContainer);
