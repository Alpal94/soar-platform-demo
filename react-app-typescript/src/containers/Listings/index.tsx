import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import { fetchSoarInfo } from './actions';
import { selectInfo } from './selectors';
import { SoarInfo } from '../../lib/model';
import { Button } from 'reactstrap';

interface ListingsProps extends React.Props<Listings> {
    info: SoarInfo;
    soarInfoFetch: (web3: any) => void;
}

interface ListingsState {

}

class Listings extends React.Component<ListingsProps, ListingsState> {

    static contextTypes = {
        web3: PropTypes.object
    };

    componentDidMount() {
        this.props.soarInfoFetch(this.context.web3.instance);
    }

    public render(): React.ReactElement<{}> {
        const { info } = this.props;
        const web3 = this.context.web3.instance;
        return (
            <div>
                <p>Total: {info.listingsCount}</p>
            </div>
        );
    }
}

function mapStateToProps() {
    return createStructuredSelector({
        info: selectInfo()
    });
}

function mapDispatchToProps(dispatch: any) {
    return {
        soarInfoFetch: (web3: any): void => {
            dispatch(fetchSoarInfo(web3));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
