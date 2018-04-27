import * as React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LatLng } from '../../../lib/model';
import Aux from '../../../hoc/auxilary';
import './index.css';

interface ChooseLocationProps {
    visible: boolean;
    initalPosition: LatLng;
    handleFilePositionConfirmed: (latLng: LatLng) => void;
}

interface ChooseLocationState {
    zoom: number;
    position: LatLng;
}

class ChooseLocation extends React.Component<ChooseLocationProps, ChooseLocationState> {

    constructor(props: any) {
        super(props);
        this.handleMapUpdate = this.handleMapUpdate.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    componentWillReceiveProps(props: any) {
        let latLng: LatLng = props.initalPosition;
        this.setState({
            position: latLng,
            zoom: 10
        });
    }

    handleMapUpdate(event: any) {
        let rawLatLng = event.target._latlng;
        let zoom = event.target._zoom;
        let latLng: LatLng = {
            lat: rawLatLng.lat,
            lng: rawLatLng.lng
        };

        this.setState({
            zoom: zoom,
            position: latLng
        });
    }

    handleConfirm() {
        this.props.handleFilePositionConfirmed(this.state.position);
    }

    public render(): React.ReactElement<{}> {

        const zoom = 10;
        const attribution = '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors';
        const tileLayerUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        
        const mapStyle = {
            position: 'block',
            minHeight: '60vh',
            display: 'block'
        };

        var invalidLocation: boolean = this.props.initalPosition ? (this.props.initalPosition.lat === '0' || this.props.initalPosition.lng === '0') : false;

        return (
            <Aux>
                {this.props.visible && 
                    <Aux>
                        <Row className="wizard-card">
                        <h2>Step 2 - Choose Location</h2>
                            {invalidLocation && <p>No valid location in this files exif</p>}
                            <Map center={this.state.position} zoom={this.state.zoom} style={mapStyle}>
                                <TileLayer
                                    attribution={attribution}
                                    url={tileLayerUrl}
                                />
                                <Marker 
                                    position={this.state.position} 
                                    draggable={true}
                                    ondragend={this.handleMapUpdate}
                                />
                            </Map>
                            <Row>
                                <Button color="primary" onClick={this.handleConfirm}>Confirm</Button>
                            </Row>
                        </Row>
                    </Aux>
                }
            </Aux>
        );
    }

}

export default ChooseLocation;
