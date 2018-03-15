import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors, Spacing, Text } from 'react-elemental';
import { withResource } from 'supercharged/client';
import copy from 'copy-text-to-clipboard';
import DeleteSecretModalContainer from 'client/app/react/containers/secrets/modal/delete-secret';
import Secret from 'client/app/react/components/secrets/secret';
import Box from 'client/app/react/components/ui/box';

class SecretContainer extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    identity: PropTypes.string,
    link: PropTypes.string,
    secretValue: PropTypes.shape({
      invoke: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    identity: null,
    link: null,
  };

  state = {
    isValueShown: null,
    isCopied: false,
    isDeleteModalVisible: false,
  };

  fetchSecretValue = (cb) => this.props.secretValue.invoke(cb);

  handleDeleteModalVisibilityChange = (isVisible) =>
    () => this.setState({ isDeleteModalVisible: isVisible });

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
    const { secretValue: { data: value, err }, name, identity, link } = this.props;
    const { isValueShown, isCopied, isDeleteModalVisible } = this.state;

    return (
      <Box>
        <Secret
          name={name}
          identity={identity}
          link={link}
          value={isValueShown && value}
          isCopied={isCopied}
          onCopyClick={this.handleCopyClick}
          onShowClick={this.handleShowClick}
          onDeleteClick={this.handleDeleteModalVisibilityChange(true)}
        />

        {err && (
          <Spacing top>
            <Text color={colors.red} size="lambda" bold>
              {err.message}
            </Text>
          </Spacing>
        )}

        {isDeleteModalVisible && (
          <DeleteSecretModalContainer
            name={name}
            onHide={this.handleDeleteModalVisibilityChange(false)}
          />
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
