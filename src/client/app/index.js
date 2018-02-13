import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Root from 'client/app/react/root';
import store from 'client/app/redux/store';

export default class App extends Component {
  constructor(props) {
    super(props);

    // One-time stateful initialization procedures
    window.console.log('init');
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </Provider>
    );
  }
}
