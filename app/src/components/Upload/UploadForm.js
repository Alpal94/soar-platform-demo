import React from 'react';
import { Control, LocalForm } from 'react-redux-form';

class UploadForm extends React.Component {

    render() {
        return (
            <LocalForm onSubmit={(val) => this.props.handleSubmit(val)}>
                <div>
                    <label>Point WKT</label>
                    <Control.text model=".pointWKT" />
                </div>
                <div>
                    <label>Price</label>
                    <Control.text model=".price" />
                </div>
                <div>
                    <label>File</label>
                    <Control.file model=".file" />
                </div>
                <div> 
                    <label></label>
                    <button>Submit!</button>
                </div>
            </LocalForm>
        );
  }
}

export default UploadForm;