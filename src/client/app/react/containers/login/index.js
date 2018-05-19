import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { LoadingBar, Spacing } from 'react-elemental';
import { Helmet } from 'react-helmet';
import { withResource } from 'supercharged/client';
import Container from 'client/app/react/components/ui/container';
import Footer from 'client/app/react/components/login/footer';
import PasswordField from 'client/app/react/components/login/password-field';
import Logo from 'client/app/react/components/ui/logo';
import Delayed from 'client/app/react/components/ui/delayed';
import WarnAlert from 'client/app/react/components/ui/alert/warn';
import withDimensions from 'client/app/react/hoc/with-dimensions';
import withForm from 'client/app/react/hoc/with-form';
import withError from 'client/app/react/hoc/with-error';
import { CODE_SESSION_UNAUTHENTICATED, CODE_SESSION_EXPIRED } from 'shared/constants/error';

// Number of pixels in height before which the compact layout should be used.
const COMPACT_THRESHOLD_HEIGHT = 600;

/**
 * Top-level container for the login (master password) view.
 */
class LoginContainer extends Component {
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
    window: PropTypes.shape({
      height: PropTypes.number.isRequired,
    }).isRequired,
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
      window: { height },
    } = this.props;

    const isCompact = height <= COMPACT_THRESHOLD_HEIGHT;

    return (
      <div>
        <Helmet>
          <title>Login - Vault</title>
        </Helmet>

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
              <Spacing size={isCompact ? 'huge' : 'enormous'} bottom>
                <Logo
                  style={{
                    fill: 'white',
                    width: isCompact ? '150px' : '200px',
                  }}
                />
              </Spacing>

              <PasswordField
                value={password}
                onChange={handleChange('password')}
                onSubmit={this.handleLoginSubmit}
                error={loginVerify.err && loginVerify.err.message}
                disabled={!loginVerify.isLoaded}
                isCompact={isCompact}
              />
            </div>

            {!isCompact && (
              <Footer />
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default compose(
  withDimensions,
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
)(LoginContainer);
