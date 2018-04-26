import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import UploadHelper from '../../lib/upload-helper';

import { uploadListingAction } from './actions';
import { FaucetInfo, UploadListing, LatLng, Metadata } from '../../lib/model';
import { Container, Button } from 'reactstrap';

import ChooseFile from './ChooseFile/index';
import ChooseLocation from './ChooseLocation/index';

interface UploadProps extends React.Props<Upload> {
    uploadListing: (web3: any, file: File, latLng: LatLng, metadata: Metadata) => void;
}

interface UploadState {
    file?: File;
    latLng?: LatLng;
}

class Upload extends React.Component<UploadProps, UploadState> {

    static contextTypes = {
        web3: PropTypes.object
    };

    constructor(props: any) {
        super(props);
        this.state = {
            file: undefined,
            latLng: { lat: '0', lng: '0'}
        };

        this.selectFileLocation = this.selectFileLocation.bind(this);
    }
    
    upload(file: File) {
        const web3 = this.context.web3.instance;
        UploadHelper.readExifData(file).then(result => {
            let latLng = UploadHelper.parseLocation(result);
            this.props.uploadListing(web3, file, latLng, {});
        });
    }

    selectFile(file: File) {

        UploadHelper.readExifData(file).then(result => {
            this.setState({
                file: file,
                latLng: UploadHelper.parseLocation(result)
            });
        });
    }

    selectFileLocation(latLng: LatLng) {
        console.log("Setting new position for file: " + latLng);
        this.setState({
            latLng: latLng
        });
    }

    public render(): React.ReactElement<{}> {
        return (
            <Container>
                <ChooseFile selectFile={(file => this.selectFile(file))} visible={this.state.file === undefined} />
                <ChooseLocation 
                    initalPosition={this.state.latLng !!} 
                    visible={this.state.file !== undefined}
                    handleFilePositionConfirmed={this.selectFileLocation}
                />
            </Container>
        );
    }
}

function mapStateToProps() {
    return createStructuredSelector({
    });
}

function mapDispatchToProps(dispatch: any) {
    return {
        uploadListing: (web3: any, file: File, latLng: LatLng, metadata: Metadata): void => {
            dispatch(uploadListingAction(web3, file, latLng, metadata));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
