import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Spacing } from 'react-elemental';
import { withResource } from 'supercharged/client';
import AdminContainer from 'client/app/react/containers/admin';
import AuthStatusPollContainer from 'client/app/react/containers/auth/status-poll';
import SecretsContainer from 'client/app/react/containers/secrets';
import SecretDetailContainer from 'client/app/react/containers/secrets/detail';
import Header from 'client/app/react/components/header';
import Container from 'client/app/react/components/ui/container';
import Splash from 'client/app/react/components/ui/splash';
import { CODE_SESSION_EXPIRED, CODE_SESSION_UNAUTHENTICATED } from 'shared/constants/error';

const ROUTE_HEADER_TABS = [
  { route: '/admin', tab: 'admin' },
  { route: '/secrets', tab: 'secrets' },
];

/**
 * Container for mediating routing changes between different selected tabs.
 */
class AuthContainer extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    auth: PropTypes.shape({
      isLoaded: PropTypes.bool.isRequired,
      err: PropTypes.shape({
        code: PropTypes.number.isRequired,
      }),
    }).isRequired,
  };

  handleTabChange = (tab) =>
    this.props.history.push(ROUTE_HEADER_TABS.find((entry) => entry.tab === tab).route);

  render() {
    const {
      history: { push },
      match: { path },
      auth: { isLoaded, err },
    } = this.props;

    if (err && [CODE_SESSION_UNAUTHENTICATED, CODE_SESSION_EXPIRED].includes(err.code)) {
      return (
        <Redirect to={{ pathname: '/login', state: { code: err.code } }} />
      );
    }

    const { tab } = ROUTE_HEADER_TABS.find(({ route }) => path.startsWith(route));

    return (
      <div>
        <Splash show={!isLoaded} />

        <Container>
          <Spacing size="large" bottom>
            <Header
              tab={tab}
              onChange={this.handleTabChange}
            />
          </Spacing>

          <Switch>
            <Route path="/admin" component={AdminContainer} exact />
            <Route path="/secrets" component={SecretsContainer} exact />
            <Route path="/secrets/:id" component={SecretDetailContainer} exact />
          </Switch>
        </Container>

        <AuthStatusPollContainer navigate={push} />
      </div>
    );
  }
}

export default withResource({
  key: 'auth',
  method: 'GET',
  endpoint: '/api/login/status',
})(AuthContainer);
