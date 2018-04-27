import * as React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Aux from '../../../hoc/auxilary';

interface ChooseFileImagePreviewProps {
    visible?: Boolean;
    imagePreviewUrl?: string;
    imageFileSize?: string;
    imageResolution?: string;
}

const ChooseFileImagePreview: React.SFC<ChooseFileImagePreviewProps> = (props) => {

    return (
        <Aux>
            {
                props.visible && (
                    <Container>
                        <Row className="image-preview-row">
                            <img src={props.imagePreviewUrl} />
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <p className="choose-file-info">File size: {props.imageFileSize}</p>
                                <p className="choose-file-info">Resolution: {props.imageResolution}</p>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </Aux>
    );
};

export default ChooseFileImagePreview;