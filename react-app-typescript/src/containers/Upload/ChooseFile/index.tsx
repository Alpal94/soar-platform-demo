import * as React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Dropzone from 'react-dropzone';
import Aux from '../../../hoc/auxilary';
import ChooseFileImagePreview from '../../../components/Upload/ChooseFile/choose-file-preview';
import ChooseFileConfirmClearButtons from '../../../components/Upload/ChooseFile/choose-file-buttons';
import Strings from '../../../locale/strings';
import './index.css';

interface ChooseFileProps extends React.Props<ChooseFile> {
    visible: Boolean;
    selectFile(value: File);
}

interface ChooseFileState {
    imagePreviewUrl?: string;
    file?: File;
    fileSize?: string;
    imageResolution?: string;
    error?: string;
}

class ChooseFile extends React.Component<ChooseFileProps, ChooseFileState> {

    initalState = {
        imagePreviewUrl: undefined,
        file: undefined,
        fileSize: undefined,
        imageResolution: undefined,
        error: undefined
    };

    constructor(props: any) {
        super(props);
        this.state = this.initalState;
        this.handleFileDropped = this.handleFileDropped.bind(this);
        this.handleFileConfirmed = this.handleFileConfirmed.bind(this);
        this.handleFileCleared = this.handleFileCleared.bind(this);
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
                        <Container className="wizard-card">
                            <Row>
                                <Col md={{ size: 6, offset: 3 }}>
    
                                    <h2>{Strings.WizardChooseFile}</h2>

                                    {this.state.error !== undefined && 
                                        <p className="error-message">{this.state.error}</p>
                                    }

                                    {this.state.file === undefined && 
                                        <Dropzone
                                            onDrop={this.handleFileDropped}
                                            accept="image/jpeg, image/png"
                                            className="choose-file"
                                            activeStyle={activeDragStyle}
                                        >
                                            <img alt="choose file to upload" src="assets/upload-icon.png"/>
                                            <p>Drop file here</p>
                                        </Dropzone>
                                    }

                                    <ChooseFileImagePreview 
                                        visible={this.state.imagePreviewUrl !== undefined}
                                        imagePreviewUrl={this.state.imagePreviewUrl} 
                                        imageFileSize={this.state.fileSize} 
                                        imageResolution={this.state.imageResolution} 
                                    />

                                    <ChooseFileConfirmClearButtons 
                                        visible={this.state.imagePreviewUrl !== undefined}
                                        onConfirm={this.handleFileConfirmed} 
                                        onClear={this.handleFileCleared} 
                                    />

                                </Col>
                            </Row>
                        </Container>
                    
                    : null
                }
            </Aux>
        );
    }

    private handleFileDropped(files: [File]) {
        if (files.length < 1) {
            this.setState({error: 'File format not recongnized. We currently only support .JPG and .PNG files' });
            return;
        }

        let file = files[0];
        let reader = new FileReader();
        reader.onload = () => {
            var image = new Image();
            image.src = reader.result;
            image.onload = () => {
                var imageResolution = image.width + ' x ' + image.height;
                this.setState({
                    imagePreviewUrl: reader.result,
                    imageResolution: imageResolution,
                    error: undefined
                });
            };
        };

        reader.readAsDataURL(file);
        let fileSize = (file.size / 1000000).toString().slice(0, 4) + 'mb';

        super.setState({...this.state, file: file, fileSize: fileSize});
    }

    private handleFileConfirmed() {
        // tslint:disable-next-line
        this.state.file ? this.props.selectFile(this.state.file) : null;
    }

    private handleFileCleared() {
        this.setState(this.initalState);
    }
}

export default ChooseFile;