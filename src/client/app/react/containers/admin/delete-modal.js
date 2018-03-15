import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-elemental';
import { withResource } from 'supercharged/client';
import DeleteModal from 'client/app/react/components/admin/delete-modal';

/**
 * Resource wrapper for the delete modal.
 */
class DeleteModalContainer extends Component {
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
    const { onHide, deleteSecrets } = this.props;

    const alert = (() => {
      if (deleteSecrets.err) {
        return (
          <Alert
            type="error"
            size="beta"
            title="Error"
            message={deleteSecrets.err.message}
          />
        );
      }

      if (deleteSecrets.data) {
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
      <DeleteModal
        alert={alert}
        isLoading={!deleteSecrets.isLoaded}
        onHide={onHide}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default withResource({
  key: 'deleteSecrets',
  method: 'DELETE',
  endpoint: '/api/admin/secrets',
  invokeOnMount: false,
})(DeleteModalContainer);
