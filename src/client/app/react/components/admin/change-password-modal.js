import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  colors,
  Button,
  Label,
  Spacing,
  Text,
  TextField,
} from 'react-elemental';
import BaseModal from 'client/app/react/components/ui/base-modal';
import withForm from 'client/app/react/hoc/with-form';

/**
 * Presentational component for changing the master decryption password.
 */
class ChangePasswordModal extends Component {
  static propTypes = {
    alert: PropTypes.node,
    isLoading: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    form: PropTypes.shape({
      password: PropTypes.string,
      passwordConfirm: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    alert: null,
  };

  handleSubmit = (evt) => {
    const { form: { password = '' }, onSubmit } = this.props;

    return onSubmit(evt, password);
  };

  render() {
    const {
      alert,
      isLoading,
      onHide,
      form: { password = '', passwordConfirm = '' },
      handleChange,
    } = this.props;

    const passwordErr = !password.length ? 'You must specify a new password.' : null;
    const passwordConfirmErr = password !== passwordConfirm ? 'The passwords do not match.' : null;

    return (
      <BaseModal
        isLoading={isLoading}
        onHide={onHide}
        alert={alert}
        title="Change master decryption password"
        body={
          <div>
            <Spacing size="large" bottom>
              <Spacing size="small" bottom>
                <Text color="gray30" inline>
                  This will update the key used for encryption and decryption of all Vault secrets.
                </Text>
                <Text color={colors.red} inline>
                  &nbsp;Note that changing the master password will also delete all secrets.
                </Text>
              </Spacing>

              <Text color="gray30" inline>
                This is because all existing secrets were encrypted with your current master
                password, and they cannot be decrypted with your new password. You will need to
                manually re-add all secrets, which will encrypt them with your new password.
              </Text>
            </Spacing>

            <Spacing bottom>
              <Label label="New password" />
              <TextField
                type="password"
                style={{ color: colors.gray10 }}
                value={password}
                error={passwordErr}
                onChange={handleChange('password')}
                secondary
              />
            </Spacing>

            <Label label="Confirm new password" />
            <TextField
              type="password"
              style={{ color: colors.gray10 }}
              value={passwordConfirm}
              error={passwordConfirmErr}
              onChange={handleChange('passwordConfirm')}
              secondary
            />
          </div>
        }
        submit={
          <Button
            text="Update"
            onClick={this.handleSubmit}
            disabled={isLoading || !!passwordErr || !!passwordConfirmErr}
          />
        }
      />
    );
  }
}

export default withForm(ChangePasswordModal);
