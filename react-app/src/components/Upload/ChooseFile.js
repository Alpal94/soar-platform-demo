import React from 'react';
import { Control, LocalForm } from 'react-redux-form';

class ChooseFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imagePreviewUrl: null,
            file: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props) {
        if(!props.file){
            this.setState({
                imagePreviewUrl: null,
                file: null
            });
        }
    }

    handleChange(values) {
        if(values.file.length > 0){
            let file = values.file[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({imagePreviewUrl: reader.result});
            }
            reader.readAsDataURL(file);
            this.props.onFileChosen(file);
        }
    }
    render() {
        let imagePreviewUrl = this.state.imagePreviewUrl;
        let element;
        if(imagePreviewUrl){
            element = (<img alt="preview" className="img-responsive" src={imagePreviewUrl}/>);
        } else {
            element = (
                <LocalForm className="choose-file-form" 
                    onChange={(values) => this.handleChange(values)}>
                        <label htmlFor="file-input">
                            <img alt="choose file to upload" src="assets/placeholder_upload.png"/>
                        </label>
                        <Control.file id="file-input" model=".file" />
                </LocalForm>
            );

        }
        return (
            <div className="row preview-image">
                {element}
            </div>
        );
  }
}

export default ChooseFile;