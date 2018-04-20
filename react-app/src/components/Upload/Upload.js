import React, { Component } from 'react';
import getMd5Hash from '../../helpers/FileHashHelper';
import EXIF from 'exif-js';
import ChooseFile from './ChooseFile';
import FileInfo from './FileInfo';
import ChooseLocation from './ChooseLocation';
import './Upload.css';
import Aux from '../../hoc/Aux';

class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileHash: '',
            exifdata: null,
            metadata: null,
            location: null,
            fileUploadedWithLocation: false,
            fileLocationConfirmed: false
        };
        this.reset = this.reset.bind(this);
        this.onFileChosen = this.onFileChosen.bind(this);
        this.onFileInfoChange = this.onFileInfoChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onConfirmLocation = this.onConfirmLocation.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    onFileChosen(file){
        if(file && file !== this.state.file){
            this.setState({file: file});
            var promises = [];
            var exifPromise = new Promise(function(resolve, reject){
                EXIF.getData(file, function() {
                    resolve(EXIF.getAllTags(this));
                });
            });
            promises.push(exifPromise);
            var hashPromise = getMd5Hash(file);
            promises.push(hashPromise);
            Promise.all(promises).then(results => {
                this.setState({
                    fileHash: results[1],
                    exifdata: results[0]
                });
                if (results[0]["GPSLatitude"]) {
                    this.setState({
                        fileUploadedWithLocation: true
                    });
                }
            })
        }
    }

    onFileInfoChange(values){
        this.setState({metadata: values});
    }

    onLocationChange(loc){
        this.setState({location: loc})
    }

    onConfirmLocation() {
        this.setState({
            fileLocationConfirmed: true
        })
    }

    handleUpload = (values) => {
        if(this.state.file && this.state.location){
            let metadata = JSON.stringify(values);
            this.props.handleSoarFileUpload(this.props.web3, this.state.file, metadata, this.state.location)
        } else {
            console.log("Error")
        }
    }

    reset() {
        this.setState({
            file: null,
            fileHash: '',
            exifdata: null,
            locationWKT: null,
            metadata: null,
            fileUploadedWithLocation: false,
            fileLocationConfirmed: false
        });
    }

    hasFile() {
        return this.state.file ? true : false;
    }

    hasLocationForFile() {
        return this.state.fileUploadedWithLocation ? true : false;
    }

    hasConfirmedLocation() {
        return this.state.fileLocationConfirmed ? true : false;
    }

    render() {
        return (
            <Aux>
                <ChooseFile 
                    file={this.state.file} 
                    onFileChosen={this.onFileChosen} 
                    visible={!(this.hasFile())} />

                <ChooseLocation
                    exifdata={this.state.exifdata}
                    onLocationChange={this.onLocationChange}
                    onConfirmLocation={this.onConfirmLocation}
                    showNoLocationWarning={!this.state.fileUploadedWithLocation}
                    visible={this.hasFile() && !this.hasConfirmedLocation()}
                />

                <FileInfo 
                    file={this.state.file} 
                    exifdata={this.state.exifdata}
                    onFileInfoChange={this.onFileInfoChange}
                    onFileInfoConfirmed={this.handleUpload}
                    visible={this.hasFile() && this.hasConfirmedLocation()}/>

                {
                    this.props.progress ? (
                        console.log("Has progress: " + this.props.progress)
                    ) : (
                        console.log("No progress")
                    )
                }

                <h1>{this.props.progress && this.props.progress.text}</h1>

            </Aux>
        );
  }
}

export default Upload;