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
            this.formDispatch(actions.change('info.date', date || ''));
            this.formDispatch(actions.change('info.make', exif.Make || ''));
            this.formDispatch(actions.change('info.model', exif.Model || ''));
            this.formDispatch(actions.change('info.dimX', exif.PixelXDimension || ''));
            this.formDispatch(actions.change('info.dimY', exif.PixelYDimension || ''));
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
                    
                    <Control.text className="form-control readonly" hidden readOnly model=".fileHash"/>

                    <Field label="Title" hintText="Enter a title for the content" component={renderTextField} model=".title" /><br />
                    <Field label="Description" hintText="Enter a description for the content" component={renderTextField} multiLine model=".description" /><br />
                    <Field label="Drone Make" component={renderTextField} model=".make" /><br />

                    <label>Make</label>
                    <Control.text className="form-control" model=".make" />
                    <label>Model</label>
                    <Control.text className="form-control" model=".model" />
                    <label>Date</label>
                    <Control.text className="form-control" model=".date" />
                    <label>Dimension X</label>
                    <Control.text className="form-control" model=".dimX" />
                    <label>Dimension Y</label>
                    <Control.text className="form-control" model=".dimY" />
            </LocalForm>
        );
  }
}

export default FileInfo;