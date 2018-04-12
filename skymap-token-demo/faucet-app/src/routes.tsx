import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Faucet from './containers/Faucet/';
import FaucetAdmin from './containers/FaucetAdmin/';

export const RouteMap: React.StatelessComponent<{}> = () => (
  <div>
    <Switch>
      <Redirect exact from="/" to="/faucet" />
      <Route path="/faucet" component={Faucet} />
      <Route path="/admin" component={FaucetAdmin} />
    </Switch>
  </div>
);
