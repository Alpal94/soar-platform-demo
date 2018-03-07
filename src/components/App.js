import React, { Component } from 'react';
import {MetaMask} from './MetaMask/MetaMask';
import Contract from './Contract';
import {Warning} from './Warning/Warning';
import {Top} from './Top/Top';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
    };
    this.setWeb3 = this.setWeb3.bind(this);
  }

  setWeb3(web3) {
    this.setState({web3});
  }

  render() {
    return (
      <div className="App">
        <Top/>
        <Warning {...this.props}/>
        <MetaMask {...this.props} {...this.state} setWeb3={this.setWeb3}/>
        <Contract {...this.props} {...this.state} />
      </div>
    );
  }
}

export default App;
