import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {Title} from './Title';
import { LinearProgress } from 'material-ui/Progress';


export const Top = (props) => (
  <div className="Top">
    <AppBar position="static" className="AppBar">
      <Toolbar>
        <Title/>
      </Toolbar>
    </AppBar>
    {props.isFetching && <LinearProgress />}
  </div>
);