import * as React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Aux from '../../../hoc/Aux';

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
                        <Row>
                            <img src={props.imagePreviewUrl} className="choose-file-preview" />
                        </Row>
                        <Row>
                            <Col md={6}>
                                <span className="choose-file-info">{props.imageFileSize}</span>
                            </Col>
                            <Col md={6}>
                                <span className="choose-file-info">{props.imageResolution}</span>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </Aux>
    );
};

export default ChooseFileImagePreview;