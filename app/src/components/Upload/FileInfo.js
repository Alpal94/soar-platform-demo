import React from 'react';
import { Control, LocalForm, actions } from 'react-redux-form';
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
        return (
            <LocalForm 
                model="info"
                className="form-group upload-summary-form"
                onChange={(values) => this.props.onFileInfoChange(values)}
                getDispatch={(dispatch) => this.attachDispatch(dispatch)}>
                    
                    <Control.text className="form-control readonly" hidden readOnly model=".fileHash"/>
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