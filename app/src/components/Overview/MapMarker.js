import React from 'react';
import parse from 'wellknown';
import { Marker, Popup } from 'react-leaflet';

const MapMarker = function(props) {
    let upload = props.soar.uploads[props.fileHash];
    let purchase = props.soar.myPurchases[upload.fileHash];
    let currentAddress = props.web3.eth.accounts[0];
    let owner = currentAddress === upload.owner;
    let onBuyButtonClicked = (() => props.handleSoarFilePurchase(props.web3, upload.fileHash, upload.price, upload.url));
    let onDownloadButtonClicked = (() => props.handleSoarFileDownload(props.web3, upload.fileHash, upload.url));
    const buttonBuy = !owner && !purchase && (<button onClick={onBuyButtonClicked}>Buy</button>);
    const buttonDownload = !owner && purchase && (<button onClick={onDownloadButtonClicked}>Download</button>);
    let p = parse(upload.pointWKT);
    let position = [p.coordinates[1], p.coordinates[0]];
    return (
        <Marker position={position} >
            <Popup>
                <div className="overview-popup">
                    <img src={upload.previewUrl} alt={upload.previewUrl} />
                    <p>{upload.metadata}</p>
                    {buttonBuy}
                    {buttonDownload}
                </div>
            </Popup>
        </Marker>
    );
  }

  export default MapMarker;