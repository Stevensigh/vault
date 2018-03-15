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
import url from 'url';
import BaseModal from 'client/app/react/components/ui/base-modal';
import withForm from 'client/app/react/hoc/with-form';

class AddSecretModal extends Component {
  static propTypes = {
    alert: PropTypes.node,
    isLoading: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    form: PropTypes.shape({
      name: PropTypes.string,
      identity: PropTypes.string,
      secret: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    alert: null,
  };

  handleSubmit = (evt) => {
    const {
      form: { name = '', link = '', identity = '', secret = '' },
      onSubmit,
    } = this.props;

    return onSubmit(evt, { name, link, identity, secret });
  };

  render() {
    const {
      alert,
      isLoading,
      onHide,
      form: { name = '', link = '', identity = '', secret = '' },
      handleChange,
    } = this.props;

    const nameErr = !name.length ? 'You must specify a name.' : null;
    const linkErr = link && !url.parse(link).host ? 'The link is invalid.' : null;
    const secretErr = !secret.length ? 'You must specify a secret value.' : null;

    return (
      <BaseModal
        isLoading={isLoading}
        onHide={onHide}
        alert={alert}
        title="Add new secret"
        body={
          <div>
            <Spacing size="large" bottom>
              <Text color="gray30">
                Add a new secret. The secret will be encrypted with the master password key used
                during login.
              </Text>
            </Spacing>

            <Spacing bottom>
              <Label label="Name" />
              <TextField
                value={name}
                style={{ color: colors.gray10 }}
                placeholder="Example"
                onChange={handleChange('name')}
                error={nameErr}
                secondary
              />
            </Spacing>

            <Spacing bottom>
              <Label label="Link (optional)" />
              <TextField
                value={link}
                style={{ color: colors.gray10 }}
                placeholder="https://example.com"
                onChange={handleChange('link')}
                error={linkErr}
                secondary
              />
            </Spacing>

            <Spacing bottom>
              <Label label="Identity (optional)" />
              <TextField
                value={identity}
                style={{ color: colors.gray10 }}
                placeholder="me@example.com"
                onChange={handleChange('identity')}
                secondary
              />
            </Spacing>

            <Label label="Secret" />
            <TextField
              value={secret}
              type="password"
              style={{ color: colors.gray10 }}
              placeholder="hunter2"
              onChange={handleChange('secret')}
              error={secretErr}
              secondary
            />
          </div>
        }
        submit={
          <Button
            text="Add"
            disabled={isLoading || !!nameErr || !!linkErr || !!secretErr}
            onClick={this.handleSubmit}
          />
        }
      />
    );
  }
}

export default withForm(AddSecretModal);
