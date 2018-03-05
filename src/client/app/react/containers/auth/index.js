import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { Spacing } from 'react-elemental';
import AdminContainer from 'client/app/react/containers/admin';
import SecretsContainer from 'client/app/react/containers/secrets';
import Header from 'client/app/react/components/header';
import Container from 'client/app/react/components/ui/container';

const ROUTE_HEADER_TABS = [
  { route: '/admin', tab: 'admin' },
  { route: '/secrets', tab: 'secrets' },
];

/**
 * Container for mediating routing changes between different selected tabs.
 */
export default class AuthContainer extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  };

  handleTabChange = (tab) =>
    this.props.history.push(ROUTE_HEADER_TABS.find((entry) => entry.tab === tab).route);

  render() {
    const { match: { path } } = this.props;

    const { tab } = ROUTE_HEADER_TABS.find(({ route }) => route === path);

    return (
      <Container>
        <Spacing bottom>
          <Header
            tab={tab}
            onChange={this.handleTabChange}
          />
        </Spacing>

        <Switch>
          <Route path="/admin" component={AdminContainer} exact />
          <Route path="/secrets" component={SecretsContainer} exact />
        </Switch>
      </Container>
    );
  }
}
