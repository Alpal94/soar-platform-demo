import React, { Component } from 'react';
import UploadDetails from './UploadDetails';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import '../../styles/leaflet.css'
import './Overview.css'

class Overview extends Component {

    render() {
        const position = [-31.9550404, 115.9303017]
        const zoom = 13

        return (
        <div>
            <h1>Overivew</h1>
            <p>Total uploaded files: {this.props.soar.filesCount}</p>
            <hr/>
            <div className="map-container">
                <Map center={position} zoom={zoom}>
                    <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />

                    {Object.keys(this.props.soar.uploads).map(key => 
                        <Marker position={position} >
                            <Popup>
                                <div className="overview-popup">
                                    <img src={this.props.soar.uploads[key].previewUrl} />
                                    <p>{this.props.soar.uploads[key].metadata}</p>
                                </div>
                            </Popup>
                        </Marker>
                    )}
                    
                </Map>

            </div>
            <hr/>
            {Object.keys(this.props.soar.uploads).map(key => 
                <UploadDetails key={key} {...this.props.soar.uploads[key]}/>
                
            )}
                
        </div>
        );
    }
}

export default Overview;