import React, { Component } from 'react';
import UploadDetails from './UploadDetails';
import { Map, TileLayer } from 'react-leaflet';
import '../../styles/leaflet.css'
import './Overview.css'
import MapMarker from './MapMarker';

class Overview extends Component {

    render() {
        const position = [-31.9550404, 115.9303017];
        const zoom = 10;
        return (
            <div>
                <div className="map-container">
                    <Map center={position} zoom={zoom}>
                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                        {Object.keys(this.props.soar.uploads).map(key => 
                            <MapMarker key={key} {...this.props} fileHash={key}/>
                        )}
                    </Map>

                </div>
                <p>Total uploaded files: {this.props.soar.filesCount}</p>
                <hr/>
                {Object.keys(this.props.soar.uploads).map(key => 
                    <UploadDetails key={key} {...this.props.soar.uploads[key]}/>
                )}
            </div>
        );
    }
}

export default Overview;