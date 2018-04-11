import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Web3 from 'web3';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import { fetchInfo } from './actions';
import { selectInfo, selectIsLoading, selectIsFetched } from './selectors';
import { Info } from '../../lib/model';

interface FaucetProps extends React.Props<Faucet> {
    info: Info;
    isLoading: boolean;
    isFetched: boolean;
    infoFetch: (web3: Web3) => void;
}

interface FaucetState {

}

class Faucet extends React.Component<FaucetProps, FaucetState> {

    static contextTypes = {
        web3: PropTypes.object
    };

    componentDidMount() {
        this.props.infoFetch(this.context.web3.instance);
    }

    public render(): React.ReactElement<{}> {
        const { info, isLoading, isFetched } = this.props;
        return (
            <div>
                <h1>Faucet</h1>
                <p>Symbol: {info.symbol}</p>
                <p>Supply: {info.supply}</p>
            </div>
        );
    }
}

function mapStateToProps() {
    return createStructuredSelector({
        info: selectInfo(),
        isLoading: selectIsLoading(),
        isFetched: selectIsFetched()
    });
}

// tslint:disable-next-line
function mapDispatchToProps(dispatch: any) {
    return {
        infoFetch: (web3: Web3): void => {
            dispatch(fetchInfo(web3));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Faucet);
