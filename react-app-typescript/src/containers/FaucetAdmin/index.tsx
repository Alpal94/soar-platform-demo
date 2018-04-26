import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import { 
    fetchInfoAction, setSkymapContractAction, setAllowanceAction,
    setIndividualCapAction, setWaitingPeriodAction
} from './actions';
import { selectInfo, selectIsLoading, selectIsFetched } from './selectors';
import { FaucetInfoAdmin } from '../../lib/model';

import AllowanceForm from '../../components/Admin/AllowanceForm';
import TokenAddressForm from '../../components/Admin/TokenAddressForm';
import IndividualCapForm from '../../components/Admin/IndividualCapForm';
import WaitingPeriodForm from '../../components/Admin/WaitingPeriodForm';
import { Row, Col, Container } from 'reactstrap';

interface FaucetAdminProps extends React.Props<FaucetAdmin> {
    info: FaucetInfoAdmin;
    isLoading: boolean;
    isFetched: boolean;

    infoFetch: (web3: any) => void;
    setSkymapContract: (web3: any, address: string) => void;
    setAllowance: (web3: any, value: number) => void;
    setIndividualCap: (web3: any, value: number) => void;
    setWaitingPeriod: (web3: any, value: number) => void;
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
            <Container>
                <h1>Administration SKYM Faucet</h1>
                <p>Faucet Owner: {info.faucetOwnerAddress}</p>
                <p>Skymap address: {info.tokenAddress}</p>
                <p>Wallet Address: {info.walletAddress}</p>
                <p>Allowance left: {info.faucetAllowance} {info.symbol}</p>
                <p>Wallet Balance: {info.walletBalance} {info.symbol}</p>
                <p>Individual Cap: {info.individualCap} {info.symbol}</p>
                <p>Waiting Period: {info.waitingPeriod} seconds</p>
                {info.isWalletOwner && (
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
                {info.isOwner && (
                    <Row>
                        <Col md="6" xs="12">
                            <h2>Individual Cap</h2>
                            <IndividualCapForm
                                submitForm={(value) => this.props.setIndividualCap(web3, value)}
                            />
                        </Col>

                        <Col md="6" xs="12">
                            <h2>Waiting Period</h2>
                            <WaitingPeriodForm
                                submitForm={(value) => this.props.setWaitingPeriod(web3, value)}
                            />
                        </Col>
                    </Row>

                )}

            </Container>
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
        },
        setIndividualCap: (web3: any, value: number): void => {
            dispatch(setIndividualCapAction(web3, value));
        },
        setWaitingPeriod: (web3: any, value: number): void => {
            dispatch(setWaitingPeriodAction(web3, value));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FaucetAdmin);
