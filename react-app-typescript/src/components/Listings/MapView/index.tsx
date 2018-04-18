import * as React from 'react';
import { TileLayer, Map } from 'react-leaflet';
import './index.css';
import { EventListingUploaded, ListingsInfo } from '../../../lib/model';
import ListingMarker from './listing-marker';

interface MapViewProps {
    listings: EventListingUploaded[];
    prices: Map<string, number>;
    info: ListingsInfo;
    priceUpdate: (geohash: string) => void;
}

const MapView: React.SFC<MapViewProps> = (props) => {

    const position = [-31.9550404, 115.9303017];
    const zoom = 10;
    return (
        <div className="listings-map-container">
            <Map center={position} zoom={zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {props.listings.map(l =>
                    <ListingMarker key={l.fileHash}
                        listing={l}
                        info={props.info}
                        prices={props.prices}
                        priceUpdate={props.priceUpdate}
                    />
                )}
            </Map>
            <div className="listings-map-info">Total: {props.info.listingsCount}</div>
        </div>
    );
};

export default MapView;