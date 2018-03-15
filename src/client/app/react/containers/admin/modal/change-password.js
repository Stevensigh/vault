import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-elemental';
import { withResource } from 'supercharged/client';
import ChangePasswordModal from 'client/app/react/components/admin/modal/change-password';

/**
 * Resource wrapper for the master decryption password change modal.
 */
class ChangePasswordModalContainer extends Component {
  static propTypes = {
    password: PropTypes.shape({
      err: PropTypes.object,
      invoke: PropTypes.func.isRequired,
    }).isRequired,
    onHide: PropTypes.func.isRequired,
  };

  handleSubmit = (evt, password) => {
    evt.preventDefault();

    this.props.password.invoke({ password });
  };

  render() {
    const { onHide, password: { isLoaded, err, data } } = this.props;

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
            message="The master decryption password has been successfully updated."
          />
        );
      }

      return null;
    })();

    return (
      <ChangePasswordModal
        alert={alert}
        isLoading={!isLoaded}
        onHide={onHide}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default withResource({
  key: 'password',
  method: 'PUT',
  endpoint: '/api/admin/password',
  invokeOnMount: false,
})(ChangePasswordModalContainer);
