import * as React from 'react';
import { TileLayer, LayersControl, BaseLayer, Map, Popup, Marker } from 'react-leaflet';
import './index.css';
import { Listing, ListingsInfo, Sale } from '../../../lib/model';
import ListingMarker from './listing-marker';

interface MapViewProps {
    listings: Listing[];
    prices: Map<string, number>;
    purchases: Map<string, Sale>;
    info: ListingsInfo;
    priceUpdate: (geohash: string) => void;
    buy: (listing: Listing, price: number) => void;
    download: (listing: Listing) => void;
}

const { BaseLayer, Overlay } = LayersControl;

const MapView: React.SFC<MapViewProps> = (props) => {

    const position = [-31.9550404, 115.9303017];
    const zoom = 10;
    return (
        <div className="listings-map-container">
            <Map center={position} zoom={zoom} className="wizard-map">
                <LayersControl position="topright">
                    <BaseLayer name="Mapbox Satellite">
                        <TileLayer
                        attribution=""
                        url="https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2hyaXNsb3dlIiwiYSI6ImYzZmI2OWM3MDgyNWQ0MTdmZTRkYWM5MjVlN2JlY2Q3In0.3aXTSJOkgeC_obQ6TDmlcw"
                        />
                    </BaseLayer>
                    <BaseLayer checked name="Mapbox Street">
                        <TileLayer
                        attribution=""
                        url="https://api.tiles.mapbox.com/v4/digitalglobe.nako6329/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2hyaXNsb3dlIiwiYSI6ImYzZmI2OWM3MDgyNWQ0MTdmZTRkYWM5MjVlN2JlY2Q3In0.3aXTSJOkgeC_obQ6TDmlcw"
                        />
                    </BaseLayer>
                    
                    {props.listings.map(listing =>
                        <ListingMarker
                            key={listing.filehash}
                            listing={listing}
                            info={props.info}
                            price={props.prices.get(listing.geohash)}
                            priceUpdate={props.priceUpdate}
                            purchase={props.purchases.get(listing.filehash)}
                            buy={props.buy}
                            download={props.download}
                        />
                    )}
                </LayersControl>
            </Map>
            <div className="listings-map-info">Total: {props.info.listingsCount}</div>
        </div>
    );
};

export default MapView;