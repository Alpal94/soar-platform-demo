import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { RouteMap } from './routes';
import store from './store';
import ContextProvider from './context-provider';

import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';

import { Container } from 'reactstrap';

import NavigationBar from './components/NavigationBar';
import Metamask from './containers/Metamask';
import ProgressBar from './containers/ProgressBar';
import Alert from './containers/Alert';
import Faucet from './containers/Faucet/';
import FaucetAdmin from './containers/FaucetAdmin/';

import './index.css';
// Import default Bootstrap 4 CSS
import 'bootstrap/dist/css/bootstrap.css';

const Root = (
  <ContextProvider>
    <Provider store={store}>
      <div>
        <Metamask />
        <NavigationBar />
        <ProgressBar />
        <Alert/>
        <BrowserRouter>
          <Container>
            <Switch>
              <Route exact path="/" component={Faucet} />
              <Route path="/admin" component={FaucetAdmin} />
            </Switch>
          </Container>
        </BrowserRouter>
      </div>
    </Provider>
  </ContextProvider>
);

render(
  Root,
  document.getElementById('root') as HTMLElement
);
