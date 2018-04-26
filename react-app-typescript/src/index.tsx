import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { RouteMap } from './routes';
import store from './store';
import ContextProvider from './context-provider';

import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

import NavigationBar from './components/NavigationBar';
import Notifications from './containers/Notifications';
import Alert from './containers/Alert';

import './styles/index.css';
import './styles/leaflet.css';
// Import default Bootstrap 4 CSS
import 'bootstrap/dist/css/bootstrap.css';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

const Root = (
  <MuiThemeProvider muiTheme={lightMuiTheme}>
    <ContextProvider>
      <Provider store={store}>
        <div>
          <Notifications />
          <NavigationBar />
          <Alert/>
          <BrowserRouter>
              <RouteMap/>
          </BrowserRouter>
        </div>
      </Provider>
    </ContextProvider>
  </MuiThemeProvider>
);

render(
  Root,
  document.getElementById('root') as HTMLElement
);
