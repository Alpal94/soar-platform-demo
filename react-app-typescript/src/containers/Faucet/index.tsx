import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import { Container, Row, Col, Button } from 'reactstrap';
import { fetchInfo, getSKYMTokens } from './actions';
import { selectInfo, selectIsLoading, selectIsFetched } from './selectors';
import { FaucetInfo } from '../../lib/model';

interface FaucetProps extends React.Props<Faucet> {
    info: FaucetInfo;
    isLoading: boolean;
    isFetched: boolean;
    infoFetch: (web3: any) => void;
    getSKYMTokens: (web3: any) => void;
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
        const web3 = this.context.web3.instance;
        return (
            <Container>
                <Row className="wizard-card">
                    <Col sm={12}>
                        <h2>SKYM Faucet</h2>
                        <p>Your Balance: {info.balance} {info.symbol}</p>
                        <Button onClick={() => this.props.getSKYMTokens(web3)}>
                            Get {info.individualCap + ' ' + info.symbol}
                        </Button>
                    </Col>
                </Row>
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
            dispatch(fetchInfo(web3));
        },
        getSKYMTokens: (web3: any): void => {
            dispatch(getSKYMTokens(web3));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Faucet);
