import React, { Component } from 'react';
import { Elemental } from 'react-elemental';
import {
  karlaBold,
  karlaRegular,
  sourceCodeProRegular,
  sourceCodeProMedium,
} from 'react-elemental-fonts';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Raven from 'raven-js';
import Root from 'client/app/react/root';
import store from 'client/app/redux/store';

const {
  NODE_ENV,
  SENTRY_CLIENT_DSN = 'https://3b26a7579b0f42eb97cd7be1b01a1e48@alerts.kevinlin.info/7',
} = process.env;

export default class App extends Component {
  constructor(props) {
    super(props);

    if (NODE_ENV === 'production') {
      Raven.config(SENTRY_CLIENT_DSN).install();
    }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Elemental
            fontOpts={{
              primary: {
                regular: karlaRegular,
                bold: karlaBold,
              },
              secondary: {
                regular: sourceCodeProRegular,
                bold: sourceCodeProMedium,
              },
            }}
          >
            <Root />
          </Elemental>
        </BrowserRouter>
      </Provider>
    );
  }
}
