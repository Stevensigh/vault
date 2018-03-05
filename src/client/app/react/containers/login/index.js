import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { LoadingBar, Spacing } from 'react-elemental';
import { withResource } from 'supercharged/client';
import Container from 'client/app/react/components/ui/container';
import Footer from 'client/app/react/components/login/footer';
import PasswordField from 'client/app/react/components/login/password-field';
import Logo from 'client/app/react/components/ui/logo';
import Delayed from 'client/app/react/components/ui/delayed';
import withForm from 'client/app/react/hoc/with-form';
import { setDecryptionPassword } from 'client/app/redux/actions/auth';

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
    actions: PropTypes.shape({
      setDecryptionPassword: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
  };

  handleLoginSubmit = (evt) => {
    evt.preventDefault();

    const {
      loginVerify,
      form: { password },
      actions,
      history,
    } = this.props;

    loginVerify.invoke({ password }, (err) => {
      if (!err) {
        actions.setDecryptionPassword(password);
        history.push('/secrets');
      }
    });
  };

  render() {
    const {
      loginVerify,
      handleChange,
      form: { password = '' },
    } = this.props;

    return (
      <div>
        {!loginVerify.isLoaded && (
          <Delayed>
            <LoadingBar style={{ position: 'absolute' }} />
          </Delayed>
        )}

        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
              />
            </div>

            <Footer />
          </div>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setDecryptionPassword }, dispatch),
});

export default compose(
  withForm,
  connect(null, mapDispatchToProps),
  withResource({
    key: 'loginVerify',
    method: 'POST',
    endpoint: '/api/login/verify',
    invokeOnMount: false,
  }),
)(Login);
