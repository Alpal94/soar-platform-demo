import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { RouteMap } from './routes';
import store from './store';
import Web3Provider from './web3-provider';

import { BrowserRouter } from 'react-router-dom';

import './index.css';

const Root = (
  <Web3Provider>
    <Provider store={store}>
      <BrowserRouter>
        <RouteMap />
      </BrowserRouter>
    </Provider>
  </Web3Provider>
);

render(
  Root,
  document.getElementById('root') as HTMLElement
);
