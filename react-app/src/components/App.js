import React, { Component } from 'react';
import {MetaMask} from './MetaMask/MetaMask';
import { Message } from './Message/Message';
import NavigationBar from './NavigationBar/NavigationBar';
import Overview from './Overview/Overview';
import Upload from './Upload/Upload';
import Browse from './Browse/Browse';
import Progress from './Shared/Progress'
import { 
  watchUploadEvents,
  watchMyPurchaseEvents
} from '../lib/soarService';
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
        owner: res.args.owner,
        fileHash: web3.toUtf8(res.args.fileHash),
        geoHash: web3.toUtf8(res.args.geoHash),
        metadata: res.args.metadata,
        pointWKT: res.args.pointWKT,
        previewUrl: res.args.previewUrl,
        url: res.args.url
      };
      this.props.eventSoarFileUpload(upload);
    })
    watchMyPurchaseEvents(web3, (err, res) => {
      let myPurchase = {
        buyer: res.args.buyer,
        fileHash: web3.toUtf8(res.args.fileHash),
        price: web3.fromWei(res.args.price).toNumber()
      };
      this.props.eventSoarMyPurchase(myPurchase);
    })

  }

  render() {
    return (
      <div>
        <NavigationBar />

        {this.props.progress && <Progress text={this.props.progress} />}  
        
        <Message {...this.props}/>
        <MetaMask {...this.props} {...this.state} setWeb3={this.setWeb3}/>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => (<Overview {...this.props} {...this.state}/>)}/>
              <Route exact path="/upload" render={() => (
                <div className="container"><Upload {...this.props} {...this.state}/></div>)
              }/>
              <Route exact path="/browse" render={() => (<Browse {...this.props} {...this.state} /> ) }/>
              
              
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
