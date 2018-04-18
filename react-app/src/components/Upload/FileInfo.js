import React from 'react';
import { Field, Control, LocalForm, actions } from 'react-redux-form';
import { Grid, Row, Col } from 'react-bootstrap';
import { TextField } from 'redux-form-material-ui';
import moment from 'moment';
import Aux from '../../hoc/Aux';
import './Upload.css';

class FileInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            exif: {}
        };
        this.handleSubmit.bind(this);
        this.handleUpdate.bind(this);
    }

    handleSubmit(values) {
        this.props.onFileInfoConfirmed(values);
    }

    handleUpdate(form) { 
        console.log(form);
    }

    render() {

        if (this.props.exifdata) {
            var make = this.props.exifdata["Make"].toString() || '';
            var model = this.props.exifdata["Model"].toString() || '';
            var focalLength = this.props.exifdata["FocalLength"].toString() || '';
            var fNumber = this.props.exifdata["FNumber"].toString() || '';
            var shutterSpeed = this.props.exifdata["ShutterSpeedValue"].toString() || '';
            var apertureValue = this.props.exifdata["ApertureValue"].toString() || '';
            var lightSource = this.props.exifdata["LightSource"].toString() || '';
            var height = this.props.exifdata["GPSAltitude"].toString() || '';
        }
    

        return (

            this.props.visible ? (

                <Grid className="wizard-card">
                    <Row>
                        <Col md={6} mdOffset={3} sm={12} smOffset={0}>
                            <h2>Step 3 - File Details</h2>
                            <LocalForm 
                                model="info"
                                className="form-group upload-summary-form"
                                onUpdate={(form) => this.handleUpdate(form)}
                                onSubmit={(values) => this.handleSubmit(values)}
                                initialState={{
                                    make: this.props.exifdata["Make"].toString() || '',
                                    model: this.props.exifdata["Model"].toString() || '',
                                    focalLength: this.props.exifdata["FocalLength"].toString() || '',
                                    fNumber: this.props.exifdata["FNumber"].toString() || '',
                                    shutterSpeed: this.props.exifdata["ShutterSpeedValue"].toString() || '',
                                    apertureValue: this.props.exifdata["ApertureValue"].toString() || '',
                                    lightSource: this.props.exifdata["LightSource"].toString() || '',
                                    height: this.props.exifdata["GPSAltitude"].toString() || ''
                                }}
                                
                                >
                                    
                                    <Control 
                                        floatingLabelText="Title" 
                                        hintText="Enter a title for the content" 
                                        component={TextField} 
                                        model=".title" 
                                        fullWidth />

                                    <Control
                                        floatingLabelText="Description" 
                                        hintText="Enter a description for the content" 
                                        component={TextField} 
                                        multiLine 
                                        model=".description" 
                                        rows={3} 
                                        fullWidth />
                                    
                                    <h3>Drone and Camera info</h3>

                                    <Control 
                                        floatingLabelText="Drone Manufacturer" 
                                        hintText="Enter the manufacturer of your drone" 
                                        component={TextField} 
                                        model=".make"
                                        fullWidth />

                                    <Control 
                                        floatingLabelText="Drone Model" 
                                        hintText="Enter the model of your drone" 
                                        component={TextField} 
                                        model=".model" 
                                        fullWidth />

                                    <Control 
                                        floatingLabelText="Shutter Speed" 
                                        hintText="Shutter speed of the camera (if known)" 
                                        component={TextField} 
                                        model=".shutterSpeed" 
                                        fullWidth />

                                    <Control 
                                        floatingLabelText="Aperture Value" 
                                        hintText="Aperture of the camera (if known)" 
                                        component={TextField} 
                                        model=".apertureValue" 
                                        value={apertureValue} 
                                        fullWidth />

                                    <Control 
                                        floatingLabelText="Focal Length" 
                                        hintText="Focal length of camera (if known)" 
                                        component={TextField} 
                                        model=".focalLength" 
                                        fullWidth />

                                    <Control 
                                        floatingLabelText="F-Stop Value" 
                                        hintText="F-Stop value of camera (if known)" 
                                        component={TextField} 
                                        model=".fstop" 
                                        value={fNumber}
                                        fullWidth/>

                                    <h3>Extra location info</h3>

                                    <Control 
                                        floatingLabelText="Height" 
                                        hintText="Enter height the photo was taken at" 
                                        component={TextField} 
                                        model=".height" 
                                        fullWidth />

                                    <Control 
                                        floatingLabelText="Bearing" 
                                        hintText="Enter the compass bearing the drone was facing " 
                                        component={TextField} 
                                        model=".bearing" 
                                        fullWidth />

                                    <Control 
                                        floatingLabelText="Angle of incidence" 
                                        hintText="Enter angle in degrees from the horizon the photo was taken an" 
                                        component={TextField} 
                                        model=".angle" 
                                        fullWidth />
                                
                                    <button type="submit" className="btn btn-primary">Upload</button>
                                </LocalForm>
                        </Col>
                    </Row>
                </Grid>
            ) : null
        );
    }
}

export default FileInfo;