import React from 'react';
import { Control, LocalForm, actions } from 'react-redux-form';
import { TextField } from 'redux-form-material-ui';
import moment from 'moment';

class FileInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            exif: {}
        };
    }

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    componentWillReceiveProps(props){
        let exif = props.exifdata || {};

        console.log(JSON.stringify(this.state.exif));

        if(this.state.exif !== exif){
            let date;
            if(exif.DateTime){
                let momentDate = moment(exif.DateTime, 'YYYY:MM:DD HH:mm:ss');
                date = momentDate.toDate().toISOString();
            }
            this.setState({exif: exif});
            this.formDispatch(actions.change('info.title', date || ''));
            this.formDispatch(actions.change('info.description', date || ''));
            this.formDispatch(actions.change('info.manufacturer', date || ''));
            this.formDispatch(actions.change('info.model', date || ''));
            this.formDispatch(actions.change('info.shutterSpeed', date || ''));
            this.formDispatch(actions.change('info.apertureValue', date || ''));
            this.formDispatch(actions.change('info.focalLength', date || ''));
            this.formDispatch(actions.change('info.bearing', date || ''));
            this.formDispatch(actions.change('info.angle', date || ''));
            this.formDispatch(actions.change('info.height', date || ''));
        }
    }

    render() {

        return (

            <LocalForm 
                model="info"
                className="form-group upload-summary-form"
                onChange={(values) => this.props.onFileInfoChange(values)}
                getDispatch={(dispatch) => this.attachDispatch(dispatch)}>

                    <h3>File Info</h3>
                    <label>Title</label>
                    <Control.text className="form-control" model=".title" />

                    <label>Description</label>
                    <Control.text className="form-control" model=".description" />

                    <h3>Drone and Camera info</h3>
                    <label>Drone Manufacturer</label>
                    <Control.text className="form-control" model=".manufacturer" />

                    <label>Drone Model</label>
                    <Control.text className="form-control" model=".model" />

                    <label>Shutter Speed</label>
                    <Control.text className="form-control" model=".shutterSpeed" />

                    <label>Aperture</label>
                    <Control.text className="form-control" model=".apertureValue" />

                    <label>Focal Length</label>
                    <Control.text className="form-control" model=".focalLength" />
                    
                    <h3>Extra location info</h3>
                    <label>Altitude</label>
                    <Control.text className="form-control" model=".altitude" />

                    <label>Bearing</label>
                    <Control.text className="form-control" model=".bearing" />

                    <label>Angle from horizon</label>
                    <Control.text className="form-control" model=".angle" />

            </LocalForm>

            // <LocalForm 
            //     model="info"
            //     className="form-group upload-summary-form"
            //     onChange={(values) => this.props.onFileInfoChange(values)}
            //     getDispatch={(dispatch) => this.attachDispatch(dispatch)}>
            //         <h3>File info</h3>
            //         <Field floatingLabelText="Title" hintText="Enter a title for the content" component={TextField} model=".title" name="Title" validate={required} /><br />
            //         <Field floatingLabelText="Description" hintText="Enter a description for the content" component={TextField} multiLine model=".description" /><br />

            //         <h3>Drone and Camera info</h3>
            //         <Field floatingLabelText="Drone Manufacturer" hintText="Enter the manufacturer of your drone" component={TextField} model=".manufacturer" /><br />
            //         <Field floatingLabelText="Drone Model" hintText="Enter the model of your drone" component={TextField} model=".model" /><br />
            //         <Field floatingLabelText="Shutter Speed" hintText="Enter shutter speed of the camera (if known)" component={TextField} model=".shutterSpeed" /><br />
            //         <Field floatingLabelText="Aperture Value" hintText="Enter aperture of the camera (if known)" component={TextField} model=".apertureValue" /><br />
            //         <Field floatingLabelText="Focal Length" hintText="Enter focal length of camera (if known)" component={TextField} model=".focalLength" /><br />

            //         <h3>Extra location info</h3>
            //         <Field floatingLabelText="Height" hintText="Enter height the photo was taken at" component={TextField} model=".height" /><br />
            //         <Field floatingLabelText="Bearing" hintText="Enter the compass bearing the drone was facing " component={TextField} model=".bearing" /><br />
            //         <Field floatingLabelText="Angle of incidence" hintText="Enter angle in degrees from the horizon the photo was taken an" component={TextField} model=".angle" /><br />
            // </LocalForm>
        );
  }
}

export default FileInfo;