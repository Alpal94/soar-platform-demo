import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AppContainer from './containers/AppContainer';

export default(
  <Router>
      <Route exact path="/" component={AppContainer}/>
  </Router>
);