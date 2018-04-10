import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Users from './containers/Users/';
import Faucet from './containers/Faucet/';

export const RouteMap: React.StatelessComponent<{}> = () => (
  <div>
    <Switch>
      <Redirect exact from="/" to="/faucet" />
      <Route path="/faucet" component={Faucet} />
      <Route path="/users" component={Users} />
    </Switch>
  </div>
);
