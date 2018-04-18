import React from 'react';
import toDecimal from '../../helpers/ExifHelper';
import { Grid, Row, Col } from 'react-bootstrap';
import { Map, TileLayer, Marker } from 'react-leaflet';
import '../../styles/leaflet.css';
import './ChooseLocation.css';
import Aux from '../../hoc/Aux';
import './Upload.css';


class ChooseLocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latlng: {
                lat : 0,
                lng : 0
            },
            zoom: 0,
            exifdata: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLocationCofirmed = this.handleLocationCofirmed.bind(this);
    }

    handleChange(event) {
        let latlng = event.target._latlng;
        let map = event.target._map;
        this.setState({
            latlng: latlng,
            zoom: map._zoom
        });
        this.props.onLocationChange(latlng);
    }

    handleLocationCofirmed(event) {
        this.props.onConfirmLocation();
    }

    componentWillReceiveProps(props){
        let exif = props.exifdata || {};
        if(this.state.exifdata !== exif){
            let state = {};
            if(exif.GPSLatitude && exif.GPSLongitude){
                let lat = toDecimal(exif.GPSLatitude);
                if(exif.GPSLatitudeRef === 'S'){
                    lat = -lat;
                }
                let lon = toDecimal(exif.GPSLongitude);
                if(exif.GPSLongitudeRef === 'W'){
                    lon = -lon;
                }
                let latlng = {
                    lat: lat,
                    lng: lon
                };
                state = {
                    latlng: latlng,
                    zoom: 13
                };
                this.props.onLocationChange(latlng);
            } else {
                state = {
                    latlng: {
                        lat : 0,
                        lng : 0
                    },
                    zoom: 0
                };
            }
            state.exifdata = exif;
            this.setState(state);
        } 
    }

    render() {
        let position = this.state.latlng;
        return (
            this.props.visible ? (
                <Aux>
                    <Grid className="wizard-card wizard-card-map upload-map-container">
                        <Row>
                            <Col sm={12}>
                            <h2>Step 2 - Choose Location</h2>
                
                            <Map center={position} zoom={this.state.zoom} className="map">
                                <TileLayer
                                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                />
                                <Marker 
                                    draggable={true}
                                    position={position}
                                    ondragend={this.handleChange} 
                                >
                        
                                </Marker>
                            </Map>
                            <div className="gps-string">{this.state.latlng.lat.toString().substring(0, 9)}, {this.state.latlng.lng.toString().substring(0, 9)}</div>

                            {
                            this.props.showNoLocationWarning ? (
                                <p>This file does not have any location meta data.  There are a number of reasons this can occur but most frequently it is because the image was edited with another program like photoshop.  You will need to select the location for the file.  Please be as accurate as possible.</p>
                            ) : null
                            }

                            </Col>
                        </Row>
                    </Grid>
                    
                    <a onClick={this.handleLocationCofirmed} className="btn btn-primary btn-confirm-location">Confirm Location</a>

                </Aux>
            ) : null
        );

  }
}

export default ChooseLocation;