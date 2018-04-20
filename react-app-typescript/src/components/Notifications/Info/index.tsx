import * as React from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { Form, FormGroup, Label, Input, Button, Row, Col, Container } from 'reactstrap';
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
            <Col sm='12' md='10'>
                <img className='logo' src="/assets/wallet.png" alt="ethereum logo" />
                <span>: {props.wallet} </span>
                <span>{props.balance}{props.symbol}</span>

            </Col>
            <Col sm='12' md='2'>
                <img className='logo' src="/assets/ethereum-logo.png" alt="ethereum logo" />
                <span>: {props.network}</span>
            </Col>
            </Row>

        </Container>
    );
};

export default Info;