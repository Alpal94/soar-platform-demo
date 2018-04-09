import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const Web3 = require('web3');

declare global {
    interface Window { web3: any; }
}

class Web3Provider extends React.Component<any, any> {
    
    constructor(props: any){
        super(props);
        this.state = {
            web3: null
        }
    }

    static childContextTypes = {
        web3: React.PropTypes.object
      };

    getChildContext() {
        return { web3: this.state.web3}
    }

    componentDidMount() {
        let self = this;
        window.addEventListener('load', function() {
            let web3 = this.window.web3;
            if (typeof web3 !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
                console.log('App: ', web3);
                self.setState({web3: web3});
            } else {
            }
        })
    }

    public render(): React.ReactElement<{}> {

        return <div id="web3">{this.props.children}</div>;
    }
}

export default Web3Provider;
