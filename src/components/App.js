import React, { Component } from 'react';
import {MetaMask} from './MetaMask/MetaMask';
import {Top} from './Top/Top';
import './App.css';
import { Message } from './Message/Message';
import Overview from './Overview/Overview';
import Upload from './Upload/Upload';
import { 
  watchUploadEvents
} from '../lib/soarService';

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
    watchUploadEvents(web3, (err, res) => {
      this.props.handleSoarFilesCount(web3);
      let upload = {
        transactionHash: res.transactionHash,
        blockNumber: res.blockNumber,
        owner: res.args.owner,
        fileHash: res.args.fileHash,
        metadata: res.args.metadata,
        pointWKT: res.args.pointWKT,
        previewUrl: res.args.previewUrl,
        price: web3.fromWei(res.args.price).toNumber(),
        url: res.args.url
      };
      this.props.eventSoarFileUpload(upload);
    })

  }

  render() {
    return (
      <div className="App">
        <Top {...this.props}/>
        <Message {...this.props}/>
        <MetaMask {...this.props} {...this.state} setWeb3={this.setWeb3}/>
        <div className="Main">
          <Overview {...this.props} {...this.state}/>
          <Upload {...this.props} {...this.state}/>
        </div>
      </div>
    );
  }
}

export default App;
