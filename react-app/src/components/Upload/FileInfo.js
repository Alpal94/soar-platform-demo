import React from 'react';
import { Field, Control, LocalForm, actions } from 'react-redux-form';
import TextField from 'material-ui/TextField';
import TextArea from 'material-ui'
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

        const renderTextField = ({input, label, hint, ...custom}) => (
            <TextField floatingLabelText={label} hintText={hint} {...input} {...custom}/>
        )

        return (
            <LocalForm 
                model="info"
                className="form-group upload-summary-form"
                onChange={(values) => this.props.onFileInfoChange(values)}
                getDispatch={(dispatch) => this.attachDispatch(dispatch)}>
                    <h3>File info</h3>
                    <Field label="Title" hintText="Enter a title for the content" component={renderTextField} model=".title" /><br />
                    <Field label="Description" hintText="Enter a description for the content" component={renderTextField} multiLine model=".description" /><br />

                    <h3>Drone and Camera info</h3>
                    <Field label="Drone Manufacturer" hintText="Enter the manufacturer of your drone" component={renderTextField} model=".manufacturer" /><br />
                    <Field label="Drone Model" hintText="Enter the model of your drone" component={renderTextField} model=".model" /><br />
                    <Field label="Shutter Speed" hintText="Enter shutter speed of the camera (if known)" component={renderTextField} model=".shutterSpeed" /><br />
                    <Field label="Aperture Value" hintText="Enter aperture of the camera (if known)" component={renderTextField} model=".apertureValue" /><br />
                    <Field label="Focal Length" hintText="Enter focal length of camera (if known)" component={renderTextField} model=".focalLength" /><br />

                    <h3>Extra location info</h3>
                    <Field label="Height" hintText="Enter height the photo was taken at" component={renderTextField} model=".height" /><br />
                    <Field label="Bearing" hintText="Enter the compass bearing the drone was facing " component={renderTextField} model=".bearing" /><br />
                    <Field label="Angle of incidence" hintText="Enter angle in degrees from the horizon the photo was taken an" component={renderTextField} model=".angle" /><br />
            </LocalForm>
        );
  }
}

export default FileInfo;