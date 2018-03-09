import React, { Component } from 'react';
import {MetaMask} from './MetaMask/MetaMask';
import {Top} from './Top/Top';
import './App.css';
import { Message } from './Message/Message';
import Overview from './Overview/Overview';
import Upload from './Upload/Upload';

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
    this.props.handleSoarFilesCount(web3);
  }

  render() {
    return (
      <div className="App">
        <Top {...this.props}/>
        <Message {...this.props}/>
        <MetaMask {...this.props} {...this.state} setWeb3={this.setWeb3}/>
        <Overview {...this.props} {...this.state}/>
        <Upload {...this.props} {...this.state}/>
      </div>
    );
  }
}

export default App;
