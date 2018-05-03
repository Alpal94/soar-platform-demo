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
import { grey300, white, fullBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

import NavigationBar from './containers/NavigationBar';
import Notifications from './containers/Notifications';
import Alert from './containers/Alert';

import './styles/index.css';
import './styles/leaflet.css';
// Import default Bootstrap 4 CSS
import 'bootstrap/dist/css/bootstrap.css';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#eed926',
    secondaryTextColor: '#081b2c',
    textColor: white,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(white, 0.3),
    clockCircleColor: fade(white, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
});

const Root = (
  <MuiThemeProvider muiTheme={muiTheme}>
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
