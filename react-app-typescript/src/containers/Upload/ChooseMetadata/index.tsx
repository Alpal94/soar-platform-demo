import * as React from 'react';
import { Control, LocalForm, Field } from 'react-redux-form';
import { TextField } from 'redux-form-material-ui';
import { Container, Row, Col } from 'reactstrap';
import Aux from '../../../hoc/Aux';

interface ChooseMetadataProps {
    visible: boolean;
    exif: {};
}

interface ChooseMetadataState {

}

class ChooseMetadata extends React.Component<ChooseMetadataProps, ChooseMetadataState> {

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values: any) {
        console.log("Handling form submit: " + values);
    }

    public render(): React.ReactElement<{}> {
        return (
            <Aux>
                {this.props.visible &&
                    <Container>
                        <Row className="wizard-card">
                            <h2>Step 3 - File details</h2>

                            <LocalForm 
                                model="info"
                                className="form-group upload-summary-form"
                                onSubmit={(values) => this.handleSubmit(values)}
                                initialState={{
                                    make: (this.props.exif["Make"] || '').toString() || '',
                                    model: (this.props.exif["Model"] || '').toString() || '',
                                    focalLength: (this.props.exif["FocalLength"] || '').toString() || '',
                                    fNumber: (this.props.exif["FNumber"] || '').toString() || '',
                                    shutterSpeed: (this.props.exif["ShutterSpeedValue"] || '').toString() || '',
                                    apertureValue: (this.props.exif["ApertureValue"] || '').toString() || '',
                                    lightSource: (this.props.exif["LightSource"] || '').toString() || '',
                                    height: (this.props.exif["GPSAltitude"] || '').toString() || ''
                                }}
                            >
                                
                                <Control 
                                
                                    component={TextField} 
                               
                                    model=".title"
                                />

                            </LocalForm>
                        </Row>
                    </Container>
                    
                }
                
            </Aux>
        );
    }
}

export default ChooseMetadata;