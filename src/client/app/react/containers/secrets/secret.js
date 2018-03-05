import React, { Component } from 'react';
import { colors, Spacing, Text } from 'react-elemental';
import { withResource } from 'supercharged/client';
import copy from 'copy-text-to-clipboard';
import Secret from 'client/app/react/components/secrets/secret';
import Box from 'client/app/react/components/ui/box';

class SecretContainer extends Component {
  state = { isValueShown: null, isCopied: false };

  fetchSecretValue = (cb) => this.props.secretValue.invoke(cb);

  handleCopyClick = () => {
    const { secretValue } = this.props;

    if (secretValue.data) {
      this.setState({ isCopied: true });
      return copy(secretValue.data);
    }

    return this.fetchSecretValue(this.handleCopyClick);
  };

  handleShowClick = () => {
    const { secretValue } = this.props;

    if (secretValue.data) {
      return this.setState(({ isValueShown }) => ({ isValueShown: !isValueShown }));
    }

    return this.fetchSecretValue(this.handleShowClick);
  };

  render() {
    const { secretValue: { value, err }, name, link } = this.props;
    const { isValueShown, isCopied } = this.state;

    return (
      <Box>
        <Secret
          name={name}
          link={link}
          value={isValueShown && value}
          isCopied={isCopied}
          onCopyClick={this.handleCopyClick}
          onShowClick={this.handleShowClick}
        />

        {err && (
          <Spacing top>
            <Text color={colors.red} size="lambda" bold>
              {err.message}
            </Text>
          </Spacing>
        )}
      </Box>
    );
  }
}

export default withResource({
  key: 'secretValue',
  method: 'POST',
  endpoint: '/api/secret',
  data: ({ name }) => ({ name }),
  invokeOnMount: false,
})(SecretContainer);
