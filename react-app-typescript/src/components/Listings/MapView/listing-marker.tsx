import * as React from 'react';
import * as Wellknown from 'wellknown';
import { Marker, Popup } from 'react-leaflet';
import DotsText from '../../DotsText/';
import { EventListingUploaded, ListingsInfo } from '../../../lib/model';
import './index.css';

interface ListingMarkerProps {
    listing: EventListingUploaded;
    info: ListingsInfo;
    prices: Map<string, number>;
    priceUpdate: (geohash: string) => void;
}

const ListingMarker: React.SFC<ListingMarkerProps> = (props) => {
    let listing = props.listing;
    // let purchase = props.soar.myPurchases[upload.fileHash];

    let isOwner = props.info.userAddress === listing.owner;

    // let onBuyButtonClicked = (() => {
    //     if(upload.price){
    //         props.handleSoarFilePurchase(props.web3, upload.fileHash, upload.price, upload.url)
    //     }
    // });
    // let onDownloadButtonClicked = (() => props.handleSoarFileDownload(props.web3, upload.fileHash, upload.url));
    // const buttonBuy = !owner && !purchase && (<button  className="btn btn-primary" onClick={onBuyButtonClicked}>Buy</button>);
    // const buttonDownload = !owner && purchase && (<button className="btn btn-primary" onClick={onDownloadButtonClicked}>Download</button>);
    let p: any = Wellknown.parse(listing.pointWKT);
    let position = [p.coordinates[1], p.coordinates[0]];
    let info = JSON.parse(listing.metadata);
    let droneCamera = info.make + ' / ' + info.model;
    let date = new Date(info.date);
    let onPopUpOpen = (() => {
        props.priceUpdate(listing.geohash)
    });
    let price = props.prices.get(listing.geohash);
    return (
        <Marker onpopupopen={onPopUpOpen} position={position} >
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
                        <div><label>Price:</label>{price || <DotsText text="loading"/>} SKYM </div>
                    </div>
                    {/* {buttonBuy} */}
                    {/* {buttonDownload} */}

                </div>
            </Popup>
        </Marker>
    );
};

export default ListingMarker;