import React from 'react';
import parse from 'wellknown';
import { Marker, Popup } from 'react-leaflet';

const MapMarker = function(props) {
    let upload = props.soar.uploads[props.fileHash];
    let purchase = props.soar.myPurchases[upload.fileHash];
    let currentAddress = props.web3.eth.accounts[0];
    let owner = currentAddress === upload.owner;

    let onBuyButtonClicked = (() => {
        if(upload.price){
            props.handleSoarFilePurchase(props.web3, upload.fileHash, upload.price, upload.url)
        }
    });
    let onDownloadButtonClicked = (() => props.handleSoarFileDownload(props.web3, upload.fileHash, upload.url));
    const buttonBuy = !owner && !purchase && (<button  className="btn btn-primary" onClick={onBuyButtonClicked}>Buy</button>);
    const buttonDownload = !owner && purchase && (<button className="btn btn-primary" onClick={onDownloadButtonClicked}>Download</button>);
    let p = parse(upload.pointWKT);
    let position = [p.coordinates[1], p.coordinates[0]];
    let info = JSON.parse(upload.metadata);
    let droneCamera = info.make + " / " + info.model;
    let date = new Date(info.date);
    let onPopUpOpen = (() => {
        if(!upload.price){
            props.handleSoarFilePriceCount(props.web3, upload.fileHash)
        }
    });
    return (
        <Marker onpopupopen={onPopUpOpen} position={position} >
            <Popup>
                <div className="overview-popup">
                    <img src={upload.previewUrl} alt={upload.previewUrl} />
                    <div className="info-panel">
                        <div><label>Drone/Camera:</label>{droneCamera}</div>
                        <div><label>Resolution:</label>{info.dimX + " x " + info.dimY}</div>
                        <div><label>Date:</label>{date.toDateString()}</div>
                        <div><label>Latitude:</label>{position[1]}</div>
                        <div><label>Longitude:</label>{position[0]}</div>
                        <div><label>Price:</label>{upload.price} ETH</div>
                        
                    </div>
                    {buttonBuy}
                    {buttonDownload}
                    
                </div>
            </Popup>
        </Marker>
    );
  }

  export default MapMarker;