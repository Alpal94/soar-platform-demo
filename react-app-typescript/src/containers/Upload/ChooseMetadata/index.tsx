import * as React from 'react';
import { Control, LocalForm, Field } from 'react-redux-form';
import { TextField } from 'redux-form-material-ui';
import { Container, Row, Col } from 'reactstrap';
import Aux from '../../../hoc/Aux';
import { Metadata } from '../../../lib/model';
import './index.css';

interface ChooseMetadataProps {
    handleSubmitMetadata: (metadata: Metadata) => void;
    visible: boolean;
    exif: any;
}

interface ChooseMetadataState {

}

class ChooseMetadata extends React.Component<ChooseMetadataProps, ChooseMetadataState> {

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values: any) {
        let metadata: Metadata = {
            make: values.make,
            model: values.model,
            focalLength: values.focalLength,
            fNumber: values.fNumber,
            apertureValue: values.apertureValue,
            shutterSpeed: values.shutterSpeed
        };

        this.props.handleSubmitMetadata(metadata);
    }

    customTextFieldControlProps(label: string, hint: string): any {
        return {
            floatingLabelText: label,
            hintText: hint,
            fullWidth: true
        };
    }

    public render(): React.ReactElement<{}> {

        //tslint:disable-next-line
        const makeControlProps = this.customTextFieldControlProps('Drone Manufacturer', 'Enter Manufacturer for your drone');
        //tslint:disable-next-line
        const modelControlProps = this.customTextFieldControlProps('Drone Model', 'Enter the model of your drone');
        //tslint:disable-next-line
        const focalLengthControlProps = this.customTextFieldControlProps('Focal Length', 'Enter the focal length of the camera (if known)');
        //tslint:disable-next-line
        const apertureValueControlProps = this.customTextFieldControlProps('Aperture Value', 'Enter the aperture of the camera (if known)');
        //tslint:disable-next-line
        const shutterSpeedControlProps = this.customTextFieldControlProps('Shutter Speed', 'Enter the shutter speed of the camera (if known)');
        //tslint:disable-next-line
        const fNumberControlProps = this.customTextFieldControlProps('F-Stop', 'Enter the f-number of the camera (if known)');
        //tslint:disable-next-line
        const lightSourceControlProps = this.customTextFieldControlProps('Light Source', 'Enter the light source of the camera (usually daytime)');
        //tslint:disable-next-line
        const heightControlProps = this.customTextFieldControlProps('Altitude (m)', 'Enter altitude of the drone when photo was taken');

        const make = 'Make';
        const model = 'Model';
        const focalLength = 'FocalLength';
        const fNumber = 'FNumber';
        const shutterSpeedValue = 'ShutterSpeedValue';
        const apertureValue = 'ApertureValue';
        const lightSource = 'LightSource';
        const gpsAltitude = 'GPSAltitude';

        return (
            <Aux>
                {this.props.visible &&
                    <Container>
                        <Row className="wizard-card file-details">
                            <h2>Step 3 - File details</h2>

                            <LocalForm 
                                model="info"
                                className="form-group upload-summary-form"
                                onSubmit={(values) => this.handleSubmit(values)}
                                initialState={{
                                    make: (this.props.exif[make] || '').toString() || '',
                                    model: (this.props.exif[model] || '').toString() || '',
                                    focalLength: (this.props.exif[focalLength] || '').toString() || '',
                                    fNumber: (this.props.exif[fNumber] || '').toString() || '',
                                    shutterSpeed: (this.props.exif[shutterSpeedValue] || '').toString() || '',
                                    apertureValue: (this.props.exif[apertureValue] || '').toString() || '',
                                    lightSource: (this.props.exif[lightSource] || '').toString() || '',
                                    height: (this.props.exif[gpsAltitude] || '').toString() || ''
                                }}
                            >
                                
                                <Control                                 
                                    component={TextField}
                                    model=".make"
                                    controlProps={makeControlProps}
                                />

                                <Control
                                    component={TextField}
                                    model=".model"
                                    controlProps={modelControlProps}
                                />

                                <Control
                                    component={TextField}
                                    model=".focalLength"
                                    controlProps={focalLengthControlProps}
                                />

                                <Control
                                    component={TextField}
                                    model=".fNumber"
                                    controlProps={fNumberControlProps}
                                />

                                <Control
                                    component={TextField}
                                    model=".shutterSpeed"
                                    controlProps={shutterSpeedControlProps}
                                />

                                <Control
                                    component={TextField}
                                    model=".apertureValue"
                                    controlProps={apertureValueControlProps}
                                />

                                <Control
                                    component={TextField}
                                    model=".lightSource"
                                    controlProps={lightSourceControlProps}
                                />

                                <Control
                                    component={TextField}
                                    model=".height"
                                    controlProps={heightControlProps}
                                />

                                <button type="submit" className="btn btn-primary">Upload</button>

                            </LocalForm>
                        </Row>
                    </Container>
                    
                }
                
            </Aux>
        );
    }
}

export default ChooseMetadata;