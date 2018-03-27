import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withResource } from 'supercharged/client';
import LoginModal from 'client/app/react/components/auth/login-modal';
import withError from 'client/app/react/hoc/with-error';
import { CODE_SESSION_UNAUTHENTICATED, CODE_SESSION_EXPIRED } from 'shared/constants/error';

const POLL_INTERVAL = 10000;

/**
 * Container for periodically validating the session status.
 */
class AuthStatusPollContainer extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      err: PropTypes.object,
      invoke: PropTypes.func.isRequired,
    }).isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: null,
  };

  componentDidMount() {
    this.refreshAuthStatus();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  refreshAuthStatus = () => {
    const { auth: { err, invoke } } = this.props;

    this.timeout = setTimeout(() => {
      if (!err) {
        invoke(null, this.refreshAuthStatus);
      }
    }, POLL_INTERVAL);
  };

  handleSubmit = () => this.props.navigate('/login');

  render() {
    const { error } = this.props;

    if (error) {
      return (
        <LoginModal err={error} onSubmit={this.handleSubmit} />
      );
    }

    return null;
  }
}

export default compose(
  withResource({
    key: 'auth',
    method: 'GET',
    endpoint: '/api/login/status',
    invokeOnMount: false,
  }),
  withError(({ auth: { err } }) => {
    switch (err && err.code) {
      case CODE_SESSION_UNAUTHENTICATED:
        return 'Your session is not authenticated. Please log in.';
      case CODE_SESSION_EXPIRED:
        return 'Your session has expired. Please log in again.';
      default:
        return null;
    }
  }),
)(AuthStatusPollContainer);
