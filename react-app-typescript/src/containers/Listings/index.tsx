import * as React from 'react';
import * as PropTypes from 'prop-types';
import { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import { fetchSoarInfoAction, eventListingUploadedAction } from './actions';
import { selectInfo, selectListings } from './selectors';
import { ListingsInfo, EventListingUploaded } from '../../lib/model';
import { Button } from 'reactstrap';
import { soarEventListingUploadedWatcher } from './saga';

import MapView from '../../components/Listings/MapView/';

interface ListingsProps extends React.Props<Listings> {
    info: ListingsInfo;
    listings: List<EventListingUploaded>;
    soarInfoFetch: (web3: any) => void;
    soarEventListingUploaded: (web3: any) => void;
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
    }

    public render(): React.ReactElement<{}> {
        const { info, listings } = this.props;
        const web3 = this.context.web3.instance;
        return (
            <div>
                <MapView info={info} listings={listings.toArray()}/>
            </div>
        );
    }
}

function mapStateToProps() {
    return createStructuredSelector({
        info: selectInfo(),
        listings: selectListings()
    });
}

function mapDispatchToProps(dispatch: any) {
    return {
        soarInfoFetch: (web3: any): void => {
            dispatch(fetchSoarInfoAction(web3));
        },
        soarEventListingUploaded: (web3: any): void => {
            dispatch(eventListingUploadedAction(web3));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
