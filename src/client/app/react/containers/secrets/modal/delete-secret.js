import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withResource } from 'supercharged/client';
import DeleteSecretModal from 'client/app/react/components/secrets/modal/delete-secret';
import ErrorAlert from 'client/app/react/components/ui/alert/error';
import SuccessAlert from 'client/app/react/components/ui/alert/success';

/**
 * Resource wrapper for deleting a specific secret by name.
 */
class DeleteSecretModalContainer extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    deleteSecret: PropTypes.shape({
      err: PropTypes.object,
      invoke: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.props.deleteSecret.invoke();
  };

  render() {
    const { name, onHide, deleteSecret: { err, isLoaded, data } } = this.props;

    const alert = (() => {
      if (err) {
        return (
          <ErrorAlert
            size="beta"
            title="Error"
            message={err.message}
          />
        );
      }

      if (data) {
        return (
          <SuccessAlert
            size="beta"
            title="Success"
            message="The secret has been deleted."
          />
        );
      }

      return null;
    })();


    return (
      <DeleteSecretModal
        name={name}
        alert={alert}
        isLoading={!isLoaded}
        onHide={onHide}
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
