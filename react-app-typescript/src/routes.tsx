import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { Container } from 'reactstrap';

import Faucet from './containers/Faucet/';
import FaucetAdmin from './containers/FaucetAdmin/';
import Listings from './containers/Listings/';
import Upload from './containers/Upload/';



export const RouteMap: React.StatelessComponent<{}> = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Listings} />
      <Container>
        <Route path="/upload" component={Upload} />
        <Route path="/faucet" component={Faucet} />
        <Route path="/admin" component={FaucetAdmin} />
      </Container>
    </Switch>
  </div>
);
