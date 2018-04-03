import React from 'react';
import toDecimal from '../../helpers/ExifHelper';
import { Map, TileLayer, Marker } from 'react-leaflet';
import '../../styles/leaflet.css'

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
            <div className="upload-map-container">
                <Map center={position} zoom={this.state.zoom}>
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
                <div>Latitude: {this.state.latlng.lat}</div>
                <div>Latitude: {this.state.latlng.lng}</div>

            </div>
        );
  }
}

export default ChooseLocation;