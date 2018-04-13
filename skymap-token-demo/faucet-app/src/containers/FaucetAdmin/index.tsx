import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import { fetchInfoAction, setSkymapContractAction, setAllowanceAction } from './actions';
import { selectInfo, selectIsLoading, selectIsFetched } from './selectors';
import { InfoAdmin } from '../../lib/model';

import AllowanceForm from '../../components/Admin/AllowanceForm';
import TokenAddressForm from '../../components/Admin/TokenAddressForm';
import { Row, Col } from 'reactstrap';

interface FaucetAdminProps extends React.Props<FaucetAdmin> {
    info: InfoAdmin;
    isLoading: boolean;
    isFetched: boolean;

    infoFetch: (web3: any) => void;
    setSkymapContract: (web3: any, address: string) => void;
    setAllowance: (web3: any, value: number) => void;
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
        let web3 = this.context.web3.instance;
        return (
            <div>
                <h1>Administration SKYM Faucet</h1>
                <p>Allowance left: {info.faucetAllowance} {info.symbol}</p>
                <p>Wallet Balance: {info.walletBalance} {info.symbol}</p>
                {info.isOwner && (
                    <Row>
                        <Col md="6" xs="12">
                            <h2>Allowance</h2>
                            <AllowanceForm
                                submitForm={(value) => this.props.setAllowance(web3, value)}
                            />
                        </Col>
                        <Col md="6" xs="12">
                            <h2>Token Address</h2>
                            <TokenAddressForm
                                submitForm={(address) => this.props.setSkymapContract(web3, address)}
                            />
                        </Col>
                    </Row>

                )}

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

function mapDispatchToProps(dispatch: any) {
    return {
        infoFetch: (web3: any): void => {
            dispatch(fetchInfoAction(web3));
        },
        setSkymapContract: (web3: any, address: string): void => {
            dispatch(setSkymapContractAction(web3, address));
        },
        setAllowance: (web3: any, value: number): void => {
            dispatch(setAllowanceAction(web3, value));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FaucetAdmin);
