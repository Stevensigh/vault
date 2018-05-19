import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withResource } from 'supercharged/client';
import ChangePasswordModal from 'client/app/react/components/admin/modal/change-password';
import ErrorAlert from 'client/app/react/components/ui/alert/error';

/**
 * Resource wrapper for the master decryption password change modal.
 */
class ChangePasswordModalContainer extends Component {
  static propTypes = {
    password: PropTypes.shape({
      err: PropTypes.object,
      invoke: PropTypes.func.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  handleSubmit = (evt, updatedPassword) => {
    const { password, onSuccess } = this.props;

    evt.preventDefault();

    password.invoke({ password: updatedPassword }, (err) => !err && onSuccess());
  };

  render() {
    const { password: { isLoaded, err }, onCancel } = this.props;

    return (
      <ChangePasswordModal
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
  key: 'password',
  method: 'PUT',
  endpoint: '/api/login/password',
  invokeOnMount: false,
})(ChangePasswordModalContainer);
