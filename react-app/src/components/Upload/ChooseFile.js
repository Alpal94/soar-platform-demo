import React from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { Grid, Row, Col } from 'react-bootstrap';
import './Upload.css';
import Aux from '../../hoc/Aux';

class ChooseFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imagePreviewUrl: null,
            file: null
        }
        this.handleFileConfirmed = this.handleFileConfirmed.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    handleFileSelected(values) {
        if(values.file.length > 0){
            let file = values.file[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({imagePreviewUrl: reader.result});
            }
            reader.readAsDataURL(file);
            this.setState({file: file});
        }
    }

    handleFileConfirmed() {
        this.props.onFileChosen(this.state.file);
    }

    render() {
        return (
            this.props.visible ? (
                <Grid className="wizard-card row preview-image">
                    <Row>
                        <Col md={6} mdOffset={3} sm={12} smOffset={0}>
                            <h2>Step 1 - Choose File</h2> 

                            {
                                this.state.imagePreviewUrl ? ( 
                                    <Aux>
                                        <Row><img src={this.state.imagePreviewUrl} /></Row>
                                        <Row><button className="btn btn-primary" onClick={this.handleFileConfirmed}>Next</button></Row>
                                    </Aux>
                                ) : (
                                    <LocalForm className="choose-file-form" onChange={(values) => this.handleFileSelected(values)}>
                                        <label htmlFor="file-input">
                                            <img alt="choose file to upload" src="assets/placeholder_upload.png"/>
                                        </label>
                                        <Control.file id="file-input" model=".file" />
                                    </LocalForm>
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