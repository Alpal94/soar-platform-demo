import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const position = [-31.9550404, 115.9303017]

const MapMarker = function(props) {
    const buttonBuy = !props.purchase && (<button onClick={props.onBuyButtonClicked}>Buy</button>);
    const buttonDownload = props.purchase && (<button>Download</button>);
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