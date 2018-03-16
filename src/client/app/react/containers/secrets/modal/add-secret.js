import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-elemental';
import { withResource } from 'supercharged/client';
import AddSecretModal from 'client/app/react/components/secrets/modal/add-secret';

class AddSecretModalContainer extends Component {
  static propTypes = {
    addSecret: PropTypes.shape({
      err: PropTypes.object,
      invoke: PropTypes.func.isRequired,
    }).isRequired,
    onHide: PropTypes.func.isRequired,
  };

  handleSubmit = (evt, form) => {
    evt.preventDefault();

    // Retain only fields that have truthy (non-zero length) values
    const data = Object.entries(form)
      .filter(([key, value]) => key && value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    this.props.addSecret.invoke(data);
  };

  render() {
    const { onHide, addSecret: { err, isLoaded, data } } = this.props;

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
            message="The new secret has been added."
          />
        );
      }

      return null;
    })();


    return (
      <AddSecretModal
        alert={alert}
        isLoading={!isLoaded}
        onHide={onHide}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default withResource({
  key: 'addSecret',
  method: 'POST',
  endpoint: '/api/secret',
  invokeOnMount: false,
})(AddSecretModalContainer);
