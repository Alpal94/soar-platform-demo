import React from 'react';
import parse from 'wellknown';
import { Grid, Row, Col } from 'react-bootstrap';
import './BrowseItem.css'

const browseItem = (props) => {

    let upload = props.soar.uploads[props.fileHash];
    let purchase = props.soar.myPurchases[upload.fileHash];
    let currentAddress = props.web3.eth.accounts[0];
    let owner = currentAddress === upload.owner;
    let p = parse(upload.pointWKT);
    let position = [p.coordinates[1], p.coordinates[0]];
    let info = JSON.parse(upload.metadata);
    let droneCamera = info.make + " / " + info.model;
    let date = new Date(info.date);

    return (
        <Col md={4} sm={12} className="BrowseItem">
            <img src={upload.previewUrl} alt={upload.previewUrl} />
                <div><label>Drone/Camera: </label>{droneCamera}</div>
                <div><label>Resolution: </label>{info.dimX + " x " + info.dimY}</div>
                <div><label>Date: </label>{date.toDateString()}</div>
                <div><label>Latitude: </label>{position[1]}</div>
                <div><label>Longitude: </label>{position[0]}</div>
        </Col>
    )
}

export default browseItem;