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
import ChooseMetadata from './ChooseMetadata';

interface UploadProps extends React.Props<Upload> {
    language: string;
    uploadListing: (web3: any, file: File, latLng: LatLng, metadata: Metadata) => void;
}

interface UploadState {
    file?: File;
    latLng?: LatLng;
    latLngConfirmed: boolean;
    exif?: any;
    metadata?: Metadata;
}

class Upload extends React.Component<UploadProps, UploadState> {

    static contextTypes = {
        web3: PropTypes.object
    };

    constructor(props: any) {
        super(props);
        this.state = {
            file: undefined,
            latLng: undefined,
            latLngConfirmed: false,
            metadata: undefined
        };

        this.selectFileLocation = this.selectFileLocation.bind(this);
        this.selectMetadata = this.selectMetadata.bind(this);
    }
    
    upload(file: File) {
        const web3 = this.context.web3.instance;
        UploadHelper.readExifData(file).then(result => {
            let latLng = UploadHelper.parseLocation(result);
            //this.props.uploadListing(web3, file, latLng, {});
        });
    }

    selectFile(file: File) {

        UploadHelper.readExifData(file).then(result => {
            this.setState({
                file: file,
                exif: result,
                latLng: UploadHelper.parseLocation(result)
            });
        });
    }

    selectFileLocation(latLng: LatLng) {
        this.setState({
            latLng: latLng,
            latLngConfirmed: true
        });
    }

    selectMetadata(metadata: Metadata) {
        this.setState({
            metadata: metadata
        });

        const web3 = this.context.web3.instance;
        this.props.uploadListing(web3, this.state.file!!, this.state.latLng!!, metadata!!);
    }

    public render(): React.ReactElement<{}> {

        let chooseFileVisible = this.state.file === undefined;
        let hasValidPosition = this.state.latLng ? UploadHelper.isPositionValid(this.state.latLng) : false;
        let chooseLocationVisible = (this.state.file !== undefined && !this.state.latLngConfirmed);
        let chooseMetadataVisible = (this.state.file !== undefined && this.state.latLngConfirmed);
        let allDataReady = (this.state.file !== undefined && this.state.latLngConfirmed && this.state.metadata);

        return (
            <Container>
                <ChooseFile selectFile={(file => this.selectFile(file))} visible={chooseFileVisible} />
                <ChooseLocation 
                    initalPosition={this.state.latLng !!} 
                    visible={chooseLocationVisible}
                    handleFilePositionConfirmed={this.selectFileLocation}
                />
                <ChooseMetadata 
                    visible={chooseMetadataVisible} 
                    exif={this.state.exif} 
                    handleSubmitMetadata={this.selectMetadata}
                />

                {allDataReady ? <p>Ready to submit</p> : null}

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
