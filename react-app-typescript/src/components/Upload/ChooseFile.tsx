import * as React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Dropzone from 'react-dropzone';
import Aux from '../../hoc/Aux';
import './ChooseFile.css';


interface ChooseFileProps extends React.Props<ChooseFile> {
    visible: Boolean
    selectFile(value: File);
}

interface ChooseFileState {
    imagePreviewUrl?: string,
    file?: File,
    fileSize?: string,
    imageResolution?: string,
    error?: string
}


class ChooseFile extends React.Component<ChooseFileProps, ChooseFileState> {

    initalState = {
        imagePreviewUrl: undefined,
        file: undefined,
        fileSize: undefined,
        imageResolution: undefined,
        error: undefined
    }

    constructor(props) {
        super(props);
        this.state = this.initalState
        this.handleFileDropped = this.handleFileDropped.bind(this);
        this.handleFileConfirmed = this.handleFileConfirmed.bind(this);
        this.handleFileCleared = this.handleFileCleared.bind(this);
    }

    private handleFileDropped(files: [File]) {
        if (files.length < 1) {
            this.setState({error: "File format not recongnized. We currently only support .JPG and .PNG files" });
            return
        }

        let file = files[0];
        let reader = new FileReader();
        reader.onload = () => {
            this.setState({imagePreviewUrl: reader.result});
            var image = new Image();
            image.src = reader.result;
            image.onload = () => {
                var imageResolution = image.width + " x " + image.height;
                console.log(imageResolution);
                this.setState({imageResolution: imageResolution});
            }
        }

        reader.readAsDataURL(file);
        let fileSize = (file.size / 1000000).toString().slice(0, 4) + "mb";
        console.log(fileSize);

        super.setState({...this.state, file: file, fileSize: fileSize});
        console.log(this.props);
    }

    private handleFileConfirmed() {
        this.state.file ? this.props.selectFile(this.state.file) : null;
    }

    private handleFileCleared() {
        this.setState(this.initalState);
    }

    public render(): React.ReactElement<{}> {

        const activeDragStyle = {
            backgroundColor: 'rgba(3, 14, 24, 1.0)',
            fontWeight: 'bolder'
        };

        return (
            <Aux>
                {
                    this.props.visible ?
                        <Container>
                            <h2>Step 1 - Choose File</h2> 

                            {
                                this.state.imagePreviewUrl ? (
                                    <Aux>
                                        <Row><img src={this.state.imagePreviewUrl} className="choose-file-preview"/></Row>
                                        <Row>
                                            <Col md={6}><span className="choose-file-info">{this.state.fileSize}</span></Col>
                                            <Col md={6}><span className="choose-file-info">{this.state.imageResolution}</span></Col>
                                        </Row>
                                        <Row>
                                            <Button className="btn btn-primary" onClick={this.handleFileConfirmed}>Confirm</Button>
                                            <Button className="btn btn-descructive" onClick={this.handleFileCleared}>Clear</Button>
                                        </Row>
                                    </Aux>
                                ) : (
                                    <Dropzone
                                        onDrop={this.handleFileDropped}
                                        accept="image/jpeg, image/png"
                                        className="choose-file"
                                        activeStyle={activeDragStyle}>
                                            <img alt="choose file to upload" src="assets/upload-icon.png"/>
                                            <p>Drop file here</p>
                                    </Dropzone>
                                )
                            }
                        </Container>
                    
                    : null
                }
            </Aux>
        );
    }
}

export default ChooseFile;