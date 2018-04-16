import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ExifRow = (props) => {
    return (
        <Row>
            <Col md={6}>{props.key}</Col>
            <Col md={6}>{props.value}</Col>
        </Row>
    )
}

export default ExifRow;