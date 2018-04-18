import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import { uploadListingAction } from './actions';
import { FaucetInfo, UploadListing } from '../../lib/model';
import { Button } from 'reactstrap';

interface FaucetProps extends React.Props<Faucet> {
    uploadListing: (web3: any, model: UploadListing) => void;
}

interface FaucetState {

}

class Faucet extends React.Component<FaucetProps, FaucetState> {

    static contextTypes = {
        web3: PropTypes.object
    };

    public render(): React.ReactElement<{}> {
        const web3 = this.context.web3.instance;
        let model: UploadListing = {
            previewUrl: 'https://s3-ap-southeast-1.amazonaws.com/soar-previews-dev/e2535d35d6a1fe2c197c92ae117ecd69.jpg',
            url: 'https://f3cmroo3se.execute-api.ap-southeast-1.amazonaws.com/dev/download/e2535d35d6a1fe2c197c92ae117ecd69.jpg',
            pointWKT: 'POINT(115.75448883333334 -31.926307083333334)',
            fileHash: 'e2535d35d6a1fe2c197c92ae117ecd69',
            geohash: 'qd6665czg0fz',
            metadata: '{"date":"2016-08-22T09:54:48.000Z","make":"DJI","model":"FC330","dimX":4000,"dimY":2250}'
        };
        let model2: UploadListing = {
            previewUrl: 'https://s3-ap-southeast-1.amazonaws.com/soar-previews-dev/963f75fc5d3e3af6da61c05e4afbaf6c.jpg',
            url: 'https://f3cmroo3se.execute-api.ap-southeast-1.amazonaws.com/dev/download/963f75fc5d3e3af6da61c05e4afbaf6c.jpg',
            pointWKT: 'POINT(115.79226411111111 -31.907548055555555)',
            fileHash: '963f75fc5d3e3af6da61c05e4afbaf6c',
            geohash: 'qd666zmm53fj',
            metadata: '{"date":"2016-08-21T02:53:53.000Z","make":"DJI","model":"FC330","dimX":4000,"dimY":2250}'
        };
        return (
            <div>
                <h1>Upload</h1>
                <Button onClick={() => this.props.uploadListing(web3, model)}>
                    Upload Mock 1
                </Button>
                <Button onClick={() => this.props.uploadListing(web3, model2)}>
                    Upload Mock 2
                </Button>
            </div>
        );
    }
}

function mapStateToProps() {
    return createStructuredSelector({
    });
}

function mapDispatchToProps(dispatch: any) {
    return {
        uploadListing: (web3: any, model: UploadListing): void => {
            dispatch(uploadListingAction(web3, model));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Faucet);
