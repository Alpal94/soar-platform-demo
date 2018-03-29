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
            zoom: 13
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log('Marke: ', event.target)
        let latlng = event.target._latlng;
        let map = event.target._map;
        this.setState({
            latlng: latlng,
            zoom: map._zoom
        });
        this.props.onLocationChange(latlng);
    }

    componentWillReceiveProps(props){
        if(props.exifdata){
            let exif = props.exifdata;
            if(exif && exif.GPSLatitude && exif.GPSLongitude){
                let lat = toDecimal(exif.GPSLatitude);
                if(exif.GPSLatitudeRef === 'S'){
                    lat = -lat;
                }
                let lon = toDecimal(exif.GPSLongitude);
                if(exif.GPSLongitudeRef === 'W'){
                    lon = -lon;
                }
                this.setState({
                    latlng: {
                        lat: lat,
                        lng: lon
                    }
                });
            }
        } else {
            this.setState({
                latlng: {
                    lat : 0,
                    lng : 0
                },
                zoom: 13
            })
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