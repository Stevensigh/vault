import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { colors, Spacing, Spinner } from 'react-elemental';
import levenshtein from 'fast-levenshtein';
import { withResource } from 'supercharged/client';
import Secret from 'client/app/react/components/secrets/secret';
import AddSecretModalContainer from 'client/app/react/containers/secrets/modal/add-secret';
import SecretsMeta from 'client/app/react/components/secrets/meta';
import Box from 'client/app/react/components/ui/box';
import Delayed from 'client/app/react/components/ui/delayed';
import SearchField from 'client/app/react/components/ui/search-field';
import withForm from 'client/app/react/hoc/with-form';

/**
 * Container listing all known secrets.
 */
class SecretsContainer extends Component {
  static propTypes = {
    secrets: PropTypes.shape({
      isLoaded: PropTypes.bool.isRequired,
      data: PropTypes.array,
    }).isRequired,
    form: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  state = { isAddModalVisible: false };

  handleAddModalVisibilityChange = (isVisible) =>
    () => this.setState({ isAddModalVisible: isVisible });

  handleSecretClick = (id) => () => this.props.history.push(`/secrets/${id}`);

  render() {
    const {
      secrets: { isLoaded, data = [] },
      form: { search = '' },
      handleChange,
    } = this.props;
    const { isAddModalVisible } = this.state;

    // Only display secrets that match the specified search term.
    const displaySecrets = data.filter(({ name }) => !search ||
      name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      levenshtein.get(search.toLowerCase(), name.toLowerCase()) <= 3);

    return (
      <div>
        <Helmet>
          <title>Secrets - Vault</title>
        </Helmet>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Spacing size="large" bottom>
            <SearchField
              value={search}
              placeholder="Search for a secret..."
              onChange={handleChange('search')}
              style={{ width: '100%' }}
            />
          </Spacing>

          <Spacing bottom>
            <SecretsMeta
              numSecrets={displaySecrets.length}
              onAddClick={this.handleAddModalVisibilityChange(true)}
            />
          </Spacing>

          {!isLoaded ? (
            <Delayed>
              <Spinner ringColor={colors.gray90} style={{ margin: '0 auto' }} />
            </Delayed>
          ) : displaySecrets.map(({ id, name, identity, link }) => (
            <Spacing key={id} bottom>
              <Box
                style={{ cursor: 'pointer' }}
                onClick={this.handleSecretClick(id)}
              >
                <Secret
                  id={id}
                  name={name}
                  identity={identity}
                  link={link}
                />
              </Box>
            </Spacing>
          ))}
        </div>

        {isAddModalVisible && (
          <AddSecretModalContainer
            onHide={this.handleAddModalVisibilityChange(false)}
          />
        )}
      </div>
    );
  }
}

export default compose(
  withForm,
  withResource({
    key: 'secrets',
    method: 'GET',
    endpoint: '/api/secrets',
  }),
)(SecretsContainer);
