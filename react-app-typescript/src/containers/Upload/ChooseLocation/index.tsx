import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LatLng } from '../../../lib/model';
import Aux from '../../../hoc/Aux';
import './index.css';

interface ChooseLocationProps {
    visible: boolean;
    position: LatLng;
}

interface ChooseLocationState {
    zoom: number;
    exifdata: {};
}

class ChooseLocation extends React.Component<ChooseLocationProps, ChooseLocationState> {

    handlePositionChange(event: any) {
        console.log(event);
    }

    public render(): React.ReactElement<{}> {

        const position = [-31.9550404, 115.9303017];
        const zoom = 10;
        const attribution = '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors';
        const tileLayerUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        
        const mapStyle = {
            position: 'block',
            minHeight: '60vh',
            display: 'block'
        };

        return (
            <Aux>
                {this.props.visible && 
                    <Row className="wizard-card">
                    <h2>Choose Location</h2>
                        <Map center={position} zoom={zoom} style={mapStyle}>
                            <TileLayer
                                attribution={attribution}
                                url={tileLayerUrl}
                            />
                            <Marker 
                                position={this.props.position} 
                                draggable={true}
                                ondragend={this.handlePositionChange}
                            />
                        </Map>
                    </Row>
                }
            </Aux>
        );
    }

}

export default ChooseLocation;
