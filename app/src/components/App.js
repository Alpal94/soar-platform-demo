import React, { Component } from 'react';
import {MetaMask} from './MetaMask/MetaMask';
import { Message } from './Message/Message';
import Overview from './Overview/Overview';
import Upload from './Upload/Upload';
import { 
  watchUploadEvents,
  watchMyPurchaseEvents
} from '../lib/soarService';
import { LinearProgress } from 'material-ui/Progress';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

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
    watchMyPurchaseEvents(web3, (err, res) => {
      let myPurchase = {
        transactionHash: res.transactionHash,
        blockNumber: res.blockNumber,
        buyer: res.args.buyer,
        fileHash: res.args.fileHash,
        price: web3.fromWei(res.args.price).toNumber()
      };
      this.props.eventSoarMyPurchase(myPurchase);
    })

  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <img src="/assets/soar_logo.png" height="30" className="d-inline-block align-top" alt=""/>
          </a>
          <a className="navbar-text" href="/upload">Upload file</a>
        </nav>
        <div className="progress-container">
          {this.props.isFetching && <LinearProgress />}
        </div>
        <Message {...this.props}/>
        <MetaMask {...this.props} {...this.state} setWeb3={this.setWeb3}/>
        <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (<Overview {...this.props} {...this.state}/>)}/>
            <Route exact path="/upload" render={() => (<Upload {...this.props} {...this.state}/>)}/>
          </Switch>
        </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
