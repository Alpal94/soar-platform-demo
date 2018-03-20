import React from 'react';
import parse from 'wellknown';
import { Marker, Popup } from 'react-leaflet';

const MapMarker = function(props) {
    const buttonBuy = !props.purchase && (<button onClick={props.onBuyButtonClicked}>Buy</button>);
    const buttonDownload = props.purchase && (<button onClick={props.onDownloadButtonClicked}>Download</button>);
    let p = parse(props.upload.pointWKT);
    let position = [p.coordinates[1], p.coordinates[0]];
    return (
        <Marker position={position} >
            <Popup>
                <div className="overview-popup">
                    <img src={props.upload.previewUrl} alt={props.upload.previewUrl} />
                    <p>{props.upload.metadata}</p>
                    {buttonBuy}
                    {buttonDownload}
                </div>
            </Popup>
        </Marker>
    );
  }

  export default MapMarker;