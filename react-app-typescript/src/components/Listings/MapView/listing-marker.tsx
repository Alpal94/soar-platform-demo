import * as React from 'react';
import * as Wellknown from 'wellknown';
import { Marker, Popup } from 'react-leaflet';
import DotsText from '../../DotsText/';
import { Listing, ListingsInfo, Sale } from '../../../lib/model';
import './index.css';
import { Button } from 'reactstrap';

interface ListingMarkerProps {
    listing: Listing;
    info: ListingsInfo;
    price?: number;
    purchase?: Sale;
    priceUpdate: (geohash: string) => void;
    buy: (listing: Listing, price: number) => void;
}

const ListingMarker: React.SFC<ListingMarkerProps> = (props) => {
    const { listing, price, purchase } = props;
    let isOwner: boolean = props.info.userAddress === listing.owner;
    // tslint:disable-next-line
    let onButtonClick: () => void = () => { };
    let buttonText: string = '';
    let disabled: boolean = true;
    if (!isOwner && !purchase) {
        buttonText = 'Buy';
        if(price){
            disabled = false;
            onButtonClick = () => props.buy(listing, price);
        }
    } else if (!isOwner && purchase) {
        buttonText = 'Download';
        disabled = false;
    }
    let p: any = Wellknown.parse(listing.pointWKT);
    let position = [p.coordinates[1], p.coordinates[0]];
    let info = JSON.parse(listing.metadata);
    let droneCamera = info.make + ' / ' + info.model;
    let date = new Date(info.date);
    return (
        <Marker onpopupopen={() => props.priceUpdate(listing.geohash)} position={position} >
            <Popup>
                <div className="listings-map-popup">
                    <img src={listing.previewUrl} alt="image preview" />
                    <div className="info-panel">
                        <div><label>Drone/Camera:</label>{droneCamera}</div>
                        <div><label>Resolution:</label>{info.dimX + ' x ' + info.dimY}</div>
                        <div><label>Date:</label>{date.toDateString()}</div>
                        <div><label>Latitude:</label>{position[1]}</div>
                        <div><label>Longitude:</label>{position[0]}</div>
                        <div><label>Geohash:</label>{listing.geohash}</div>
                        <div><label>Price:</label>{price || <DotsText text="loading" />} SKYM </div>
                    </div>
                    {buttonText &&
                        <Button
                            color="primary"
                            disabled={disabled}
                            onClick={onButtonClick}
                        >
                            {buttonText}
                        </Button>
                    }
                </div>
            </Popup>
        </Marker>
    );
};

export default ListingMarker;