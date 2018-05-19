import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { LoadingBar, Spacing } from 'react-elemental';
import { withResource } from 'supercharged/client';
import Container from 'client/app/react/components/ui/container';
import Footer from 'client/app/react/components/login/footer';
import PasswordField from 'client/app/react/components/login/password-field';
import Logo from 'client/app/react/components/ui/logo';
import Delayed from 'client/app/react/components/ui/delayed';
import WarnAlert from 'client/app/react/components/ui/alert/warn';
import withForm from 'client/app/react/hoc/with-form';
import withError from 'client/app/react/hoc/with-error';
import { CODE_SESSION_UNAUTHENTICATED, CODE_SESSION_EXPIRED } from 'shared/constants/error';

/**
 * Top-level container for the login (master password) view.
 */
class Login extends Component {
  static propTypes = {
    loginVerify: PropTypes.shape({
      err: PropTypes.object,
      isLoaded: PropTypes.bool.isRequired,
      invoke: PropTypes.func.isRequired,
    }).isRequired,
    form: PropTypes.shape({
      password: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: null,
  };

  handleLoginSubmit = (evt) => {
    evt.preventDefault();

    const {
      loginVerify,
      form: { password },
      history,
    } = this.props;

    loginVerify.invoke({ password }, (err) => {
      if (!err) {
        history.push('/secrets');
      }
    });
  };

  render() {
    const {
      loginVerify,
      handleChange,
      form: { password = '' },
      error,
    } = this.props;

    return (
      <div>
        {!loginVerify.isLoaded && (
          <Delayed>
            <LoadingBar style={{ position: 'absolute' }} />
          </Delayed>
        )}

        <Container>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              position: 'relative',
            }}
          >
            {error && (
              <Spacing size="large" style={{ position: 'absolute', right: 0 }} top>
                <WarnAlert
                  title="Warning"
                  message={error}
                />
              </Spacing>
            )}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'center',
              }}
            >
              <Spacing size="enormous" bottom>
                <Logo style={{ fill: 'white', width: '200px' }} />
              </Spacing>

              <PasswordField
                value={password}
                onChange={handleChange('password')}
                onSubmit={this.handleLoginSubmit}
                error={loginVerify.err && loginVerify.err.message}
                disabled={!loginVerify.isLoaded}
              />
            </div>

            <Footer />
          </div>
        </Container>
      </div>
    );
  }
}

export default compose(
  withForm,
  withError(({ location: { state: { code } = {} } }) => {
    switch (code) {
      case CODE_SESSION_EXPIRED:
        return 'Your session has expired. Please log in again.';
      case CODE_SESSION_UNAUTHENTICATED:
        return 'Your session is not currently authenticated. Please log in.';
      default:
        return null;
    }
  }),
  withResource({
    key: 'loginVerify',
    method: 'POST',
    endpoint: '/api/auth/status',
    invokeOnMount: false,
  }),
)(Login);
