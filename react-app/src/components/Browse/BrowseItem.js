import React from 'react';
import parse from 'wellknown';
import Geocode from 'react-geocode';
import Async from 'react-promise';
import { Grid, Row, Col } from 'react-bootstrap';
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
    let droneCamera = info.make + " / " + info.model;
    let date = new Date(info.date);
    // let geocode = Geocode.fromLatLng(position[0], position[1]).then(
    //     response => {
    //         const address = response.results[0].formatted_address;
    //         console.log(address);
    //       },
    //       error => {
    //         console.error(error);
    //       }
    //     );

    let getGeocode = function() {
        return Geocode.fromLatLng(position[0], position[1]);
    }

    let prom = new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(Geocode.fromLatLng(position[0], position[1]));
        }, 100)
      })
    


    return (
        <Col md={4} sm={12} className="BrowseItem">
            <img src={upload.previewUrl} alt={upload.previewUrl} />
                <div><label>Address: </label><Async promise={prom} then={val => <p>{val.results[0].formatted_address}</p>} /></div>
                <div><label>Drone/Camera: </label>{droneCamera}</div>
                <div><label>Resolution: </label>{info.dimX + " x " + info.dimY}</div>
                <div><label>Date: </label>{date.toDateString()}</div>
                <div><label>Latitude: </label>{position[1]}</div>
                <div><label>Longitude: </label>{position[0]}</div>
        </Col>
    )
}

export default browseItem;