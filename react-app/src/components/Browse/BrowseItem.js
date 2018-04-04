import React from 'react';
import parse from 'wellknown';
import Geocode from 'react-geocode';
import Async from 'react-promise';
import { Grid, Row, Col } from 'react-bootstrap';
import BrowseDetailRow from './BrowseDetailRow';
import './BrowseItem.css'

const browseItem = (props) => {

    Geocode.setApiKey("AIzaSyDIHfiYwIdK0Lclybj1_Y9LaG4vt3moT2g");
    Geocode.enableDebug();


    let upload = props.soar.uploads[props.fileHash];
    let purchase = props.soar.myPurchases[upload.fileHash];
    let currentAddress = props.web3.eth.accounts[0];
    let owner = currentAddress === upload.owner;
    let p = parse(upload.pointWKT);
    let position = [p.coordinates[1], p.coordinates[0]];
    let info = JSON.parse(upload.metadata);
    let droneMake = info.make;
    let droneModel = info.model;
    let date = new Date(info.date);

    let geocodePromise = new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(Geocode.fromLatLng(position[0], position[1]));
        }, 100)
      })

    let geocodeAsync = <Async promise={geocodePromise} then={val => <p>{val.results[0].formatted_address}</p>} />
        
    
    
    return (
        <Col md={4} sm={12} className="BrowseItem">
            <Row>
                <img src={upload.previewUrl} alt={upload.previewUrl} />
            </Row>
            <BrowseDetailRow label="Address" value={geocodeAsync} />
            <BrowseDetailRow label="Drone" value={droneMake} />
            <BrowseDetailRow label="Camera" value={droneModel} />
            <BrowseDetailRow label="Resolution" value={info.dimX + "x" + info.dimY} />
            <BrowseDetailRow label="Date" value={date.toDateString} />
        </Col>
    )
}

export default browseItem;