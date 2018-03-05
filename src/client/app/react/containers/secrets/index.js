import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { colors, Spacing, Spinner } from 'react-elemental';
import levenshtein from 'fast-levenshtein';
import { withResource } from 'supercharged/client';
import Secret from 'client/app/react/containers/secrets/secret';
import SearchField from 'client/app/react/components/secrets/search-field';
import Delayed from 'client/app/react/components/ui/delayed';
import withForm from 'client/app/react/hoc/with-form';

class SecretsContainer extends Component {
  componentDidMount() {
    const { isDecryptionPasswordDefined, history } = this.props;

    // TODO: disable once login flow works
    if (!isDecryptionPasswordDefined) {
      // history.push('/login');
    }
  }

  render() {
    const {
      secrets: { isLoaded, data = [] },
      form: { search = '' },
      handleChange,
    } = this.props;

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
          <Spacing bottom>
            <SearchField
              value={search}
              onChange={handleChange('search')}
            />
          </Spacing>

          {!isLoaded ? (
            <Delayed>
              <Spinner ringColor={colors.gray90} style={{ margin: '0 auto' }} />
            </Delayed>
          ) : displaySecrets.map(({ name, link }) => (
            <Spacing key={name} bottom>
              <Secret name={name} link="https://wealthfront.com" />
            </Spacing>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isDecryptionPasswordDefined: !!auth.decryptionPassword,
});

export default compose(
  withForm,
  connect(mapStateToProps),
  withResource({
    key: 'secrets',
    method: 'GET',
    endpoint: '/api/secrets',
  }),
)(SecretsContainer);
