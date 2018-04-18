import * as React from 'react';
import * as PropTypes from 'prop-types';
import { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import {
    fetchSoarInfoAction,
    eventListingUploadedAction,
    priceUpdateAction,
    eventUserPurchaseAction
} from './actions';
import { 
    selectInfo, 
    selectListings, 
    selectPrices,
    selectPurchases
} from './selectors';
import { ListingsInfo, EventListingUploaded, EventSale } from '../../lib/model';
import { Button } from 'reactstrap';
import { soarEventListingUploadedWatcher } from './saga';

import MapView from '../../components/Listings/MapView/';

interface ListingsProps extends React.Props<Listings> {
    info: ListingsInfo;
    listings: List<EventListingUploaded>;
    prices: Map<string, number>;
    purchases: Map<string, EventSale>;
    soarInfoFetch: (web3: any) => void;
    soarEventListingUploaded: (web3: any) => void;
    soarPriceUpdate: (web3: any, geohash: string) => void;
    soarEventUserPurchase: (web3: any) => void;
}

interface ListingsState {

}

class Listings extends React.Component<ListingsProps, ListingsState> {

    static contextTypes = {
        web3: PropTypes.object
    };

    componentDidMount() {
        this.props.soarInfoFetch(this.context.web3.instance);
        this.props.soarEventListingUploaded(this.context.web3.instance);
        this.props.soarEventUserPurchase(this.context.web3.instance);
    }

    priceUpdate(geohash: string) {
        const web3 = this.context.web3.instance;
        this.props.soarPriceUpdate(web3, geohash);
    }

    public render(): React.ReactElement<{}> {
        const { info, listings, prices, purchases } = this.props;
        const web3 = this.context.web3.instance;
        return (
            <div>
                <MapView
                    info={info}
                    listings={listings.toArray()}
                    prices={prices}
                    purchases={purchases}
                    priceUpdate={(geohash: string) => this.priceUpdate(geohash)}
                />
            </div>
        );
    }
}

function mapStateToProps() {
    return createStructuredSelector({
        info: selectInfo(),
        listings: selectListings(),
        prices: selectPrices(),
        purchases: selectPurchases()
    });
}

function mapDispatchToProps(dispatch: any) {
    return {
        soarInfoFetch: (web3: any): void => {
            dispatch(fetchSoarInfoAction(web3));
        },
        soarEventListingUploaded: (web3: any): void => {
            dispatch(eventListingUploadedAction(web3));
        },
        soarPriceUpdate: (web3: any, geohash: string): void => {
            dispatch(priceUpdateAction(web3, geohash));
        },
        soarEventUserPurchase: (web3: any): void => {
            dispatch(eventUserPurchaseAction(web3));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
