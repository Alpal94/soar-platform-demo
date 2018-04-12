import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Web3 from 'web3';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import { fetchInfo, setSkymapContract } from './actions';
import { selectInfo, selectIsLoading, selectIsFetched } from './selectors';
import { InfoAdmin } from '../../lib/model';

interface FaucetAdminProps extends React.Props<FaucetAdmin> {
    info: InfoAdmin;
    isLoading: boolean;
    isFetched: boolean;
    infoFetch: (web3: Web3) => void;
    setSkymapContract: (web3: Web3, address: string) => void;
}

interface FaucetAdminState {

}

class FaucetAdmin extends React.Component<FaucetAdminProps, FaucetAdminState> {

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
                <p>Allowance: {info.faucetAllowance}</p>
                <p>Wallet Balance: {info.walletBalance}</p>
                {/* <button onClick={() => this.props.getSKYM(this.context.web3.instance)}>Get SKYM</button> */}
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
        },
        setSkymapContract: (web3: Web3, address: string): void => {
            dispatch(setSkymapContract(web3, address));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FaucetAdmin);
