import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { RouteMap } from './routes';
import store from './store';
import Web3Provider from './web3-provider';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import Metamask from './containers/Metamask';

const Root = (
  <Web3Provider>
    <Provider store={store}>
      <div>
      <Metamask/>
      <BrowserRouter>
        <RouteMap />
      </BrowserRouter>
        
      </div>
    </Provider>
  </Web3Provider>
);

render(
  Root,
  document.getElementById('root') as HTMLElement
);
