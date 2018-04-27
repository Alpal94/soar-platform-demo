import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Faucet from './containers/Faucet/';
import FaucetAdmin from './containers/FaucetAdmin/';
import Listings from './containers/Listings/';
import Upload from './containers/Upload/';
import Admin from './containers/Admin/';

export const RouteMap: React.StatelessComponent<{}> = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Listings} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/upload" component={Upload} />
      <Route exact path="/faucet" component={Faucet} />
      <Route exact path="/faucet/admin" component={FaucetAdmin} />
    </Switch>
  </div>
);
