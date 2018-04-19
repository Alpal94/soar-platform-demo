import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const Web3 = require('web3');

declare global {
    interface Window { web3: any; }
}

interface ContextProviderPros {

}

interface ContextProviderState {
    web3?: any;
    loading: boolean;
}

class ContextProvider extends React.Component<ContextProviderPros, ContextProviderState> {

    static childContextTypes = {
        web3: PropTypes.object
    };

    constructor(props: ContextProviderPros) {
        super(props);
        this.state = {
            web3: undefined,
            loading: true
        };
    }

    getChildContext() {
        return {
            web3: {
                instance: this.state.web3,
                loading: this.state.loading,
                setWeb3: (provider: string) => {
                    let web3 = new Web3(new Web3.providers.HttpProvider(provider));
                    this.setState({ web3: web3, loading: false });
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

export default ContextProvider;
