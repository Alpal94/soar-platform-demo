import React from 'react';
import { Row, Col } from 'react-bootstrap';

const browseDetailRow = (props) => {
    return(
        <Row>
            <Col sm={3}><label>{props.label}</label></Col>
            <Col sm={9}>{props.value}</Col>
        </Row>
    )
}

export default browseDetailRow;