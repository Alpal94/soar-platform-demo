import * as React from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { Form, FormGroup, Label, Input, Button, Row, Col, Container } from 'reactstrap';
import ViewHelper from '../../../lib/view-helper';
import './index.css';

interface InfoProps {
    network: string;
    wallet: string;
    balance: number;
    symbol: string;
}

const Info: React.SFC<InfoProps> = (props) => {
    return (
        <Container className="notifications-info">
            <Row>
                <Col className="inline" xs="8" sm="9">
                    <img className="logo" src="/assets/wallet.png" alt="ethereum logo" />
                    <span className="wallet-address"> {ViewHelper.truncateMiddle(props.wallet, 15)} </span>
                    <span>{props.balance}{props.symbol}</span>
                </Col>
                <Col className="inline" xs="4" sm="3">
                    <img className="logo" src="/assets/ethereum-logo.png" alt="ethereum logo" />
                    <span> {props.network}</span>
                </Col>
            </Row>

        </Container>
    );
};

export default Info;