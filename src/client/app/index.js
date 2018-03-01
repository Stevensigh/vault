import React from 'react';
import { Elemental } from 'react-elemental';
import {
  karlaBold,
  karlaRegular,
  sourceCodeProRegular,
  sourceCodeProMedium,
} from 'react-elemental-fonts';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Root from 'client/app/react/root';
import store from 'client/app/redux/store';

const App = () => (
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

export default App;
