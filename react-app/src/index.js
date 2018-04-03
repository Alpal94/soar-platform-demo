import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './container/AppContainer';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();

