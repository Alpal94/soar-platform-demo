import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import { 
    fetchInfoAction
} from './actions';
import { selectInfo } from './selectors';
import { AdminInfo } from '../../lib/model';

import { Row, Col, Container } from 'reactstrap';

interface AdminProps extends React.Props<Admin> {
    info: AdminInfo;
    infoFetch: (web3: any) => void;
}

interface AdminState {

}

class Admin extends React.Component<AdminProps, AdminState> {

    static contextTypes = {
        web3: PropTypes.object
    };

    componentDidMount() {
        this.props.infoFetch(this.context.web3.instance);
    }

    public render(): React.ReactElement<{}> {
        const { info } = this.props;
        let web3 = this.context.web3.instance;
        return (
            <Container>
                <h1>Soar Administration</h1>
                <p>Owner address: {info.ownerAddress}</p>
                <p>Skymap address: {info.skymapTokenAddress}</p>
                <p>Pricing address: {info.pricingContractAddress}</p>
                <p>Wallet address: {info.walletAddress}</p>
                <p>Total listings: {info.listingsCount}</p>
            </Container>
        );
    }
}

function mapStateToProps() {
    return createStructuredSelector({
        info: selectInfo()
    });
}

function mapDispatchToProps(dispatch: any) {
    return {
        infoFetch: (web3: any): void => {
            dispatch(fetchInfoAction(web3));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
