import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Faucet from './containers/Faucet/';
import FaucetAdmin from './containers/FaucetAdmin/';
import Listings from './containers/Listings/';

export const RouteMap: React.StatelessComponent<{}> = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Listings} />
      <Route path="/faucet" component={Faucet} />
      <Route path="/admin" component={FaucetAdmin} />
    </Switch>
  </div>
);
