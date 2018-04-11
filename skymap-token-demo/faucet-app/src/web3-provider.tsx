import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const Web3 = require('web3');

declare global {
    interface Window { web3: any; }
}

interface Web3ProviderState {
    web3: any;
    loading: boolean;
}

class Web3Provider extends React.Component<any, Web3ProviderState> {

    constructor(props: any) {
        super(props);
        this.state = {
            web3: null,
            loading: true
        };
    }

    static childContextTypes = {
        web3: PropTypes.object
    };

    getChildContext() {
        return {
            web3: {
                instance: this.state.web3,
                loading: this.state.loading,
                setWeb3: (provider: string) => {
                    let web3 = new Web3(new Web3.providers.HttpProvider(provider));
                    this.setState({ web3: web3, loading: false })
                }
            }
        };
    }

    componentDidMount() {
        let self = this;
        window.addEventListener('load', function () {
            let web3 = this.window.web3;
            if (typeof web3 !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
                self.setState({ loading: false, web3: web3 });
            } else {
                self.setState({ loading: false });
            }
        });
    }

    public render(): React.ReactElement<{}> {
        let element;
        if (this.state.loading) {
            element = 'loading';
        } else {
            element = this.props.children;
        }

        return <div id="web3-wrapper">{element}</div>;
    }
}

export default Web3Provider;
