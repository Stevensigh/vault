import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withResource } from 'supercharged/client';
import AddSecretModal from 'client/app/react/components/secrets/add-secret-modal';
import ErrorAlert from 'client/app/react/components/ui/alert/error';

/**
 * Data-fetching container for adding a new secret.
 */
class AddSecretModalContainer extends Component {
  static propTypes = {
    addSecret: PropTypes.shape({
      err: PropTypes.object,
      invoke: PropTypes.func.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  handleSubmit = (evt, form) => {
    const { addSecret, onSuccess } = this.props;

    evt.preventDefault();

    // Retain only fields that have truthy (non-zero length) values
    const data = Object.entries(form)
      .filter(([key, value]) => key && value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    addSecret.invoke(data, (err, resp) => !err && onSuccess(resp));
  };

  render() {
    const { addSecret: { err, isLoaded }, onCancel } = this.props;

    return (
      <AddSecretModal
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
  key: 'addSecret',
  method: 'POST',
  endpoint: '/api/secrets',
  invokeOnMount: false,
})(AddSecretModalContainer);
