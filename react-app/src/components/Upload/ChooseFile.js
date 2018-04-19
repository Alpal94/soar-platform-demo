import React from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { Grid, Row, Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import './Upload.css';
import './ChooseFile.css';
import Aux from '../../hoc/Aux';

class ChooseFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imagePreviewUrl: null,
            file: null,
            fileSize: null,
            imageResolution: null,
            error: null

        }
        this.handleFileConfirmed = this.handleFileConfirmed.bind(this);
        this.handleFileDropped = this.handleFileDropped.bind(this);
        this.handleFileClear = this.handleFileClear.bind(this);
        this.handleFileLoadError = this.handleFileLoadError.bind(this);
    }

    handleFileLoadError(errorMessage) {
        this.setState({error: errorMessage});
    }

    handleFileDropped(files) {
        if (files.length < 1) {
            this.handleFileLoadError("File format not recognized.  We currently only support .PNG and .JPG");
            return;
        }
        let file = files[0];
        this.setState({file: file});
        let reader = new FileReader();
        reader.onload = () => {
            this.setState({imagePreviewUrl: reader.result});
            var image = new Image();
            image.src = reader.result;
            image.onload = () => {
                var imageResolution = image.width + " x " + image.height;
                console.log("Image resolution: " + imageResolution);
                this.setState({imageResolution: imageResolution});
            }

        }
        reader.onabort = () => console.log("File reading aborted");
        reader.onerror = () => console.log("File reader error");

        reader.readAsDataURL(file);
        let fileSize = (file.size / 1000000).toString().slice(0, 4) + "mb";
        console.log("FileSize: " + fileSize);
        this.setState({file: file, fileSize: fileSize});
    }

    handleFileConfirmed() {
        this.props.onFileChosen(this.state.file);
    }

    handleFileClear() {
        this.setState({
            imagePreviewUrl: null, 
            file: null,
            fileSize: null,
            imageResolution: null,
            error: null});
    }

    

    render() {
     
        const activeDragStyle = {
            backgroundColor: 'rgba(3, 14, 24, 1.0)',
            fontWeight: 'bolder'
        };
     
        return (
            this.props.visible ? (
                <Grid className="wizard-card row preview-image">
                    <Row>
                        <Col md={6} mdOffset={3} sm={12} smOffset={0}>
                            <h2>Step 1 - Choose File</h2> 

                            {
                                this.state.imagePreviewUrl ? ( 
                                    <Aux>
                                        <Row><img src={this.state.imagePreviewUrl} className="choose-file-preview"/></Row>
                                        <Row>
                                            <p>File size: {this.state.fileSize}</p>
                                            <p>Image resolution: {this.state.imageResolution}</p>
                                            
                                        </Row>

                                        <Row className="button-row">
                                            <button className="btn btn-danger btn-clear-file" onClick={this.handleFileClear}>Clear</button>
                                            <button className="btn btn-primary btn-select-file" onClick={this.handleFileConfirmed}>Next</button>
                                        </Row>
                                    </Aux>
                                ) : (
                                    <Dropzone 
                                        onDrop={this.handleFileDropped}
                                        accept="image/jpeg, image/png"
                                        className="choose-file" 
                                        activeStyle={activeDragStyle}>
                                        <div>
                                            <img alt="choose file to upload" src="assets/placeholder_upload.png"/>
                                            <p><strong>Choose a file</strong> or drag it here</p>
                                            { this.state.error ? <p className="error">{this.state.error}</p> : null}
                                        </div>
                                    </Dropzone>
                                )
                            }
                        </Col>
                    </Row>
                </Grid>
            ) : null
        );
    }
}

export default ChooseFile;