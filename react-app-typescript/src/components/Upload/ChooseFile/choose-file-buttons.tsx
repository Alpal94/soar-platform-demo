import * as React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Aux from '../../../hoc/Aux';

interface Props {
    visible: Boolean;
    onConfirm: () => void;
    onClear: () => void;
}

const ChooseFileConfirmClearButtons: React.SFC<Props> = (props) => {

    return (
        <Aux>
            { props.visible && (
                <Row>
                    <Button color="danger" onClick={props.onClear}>Clear</Button>
                    <Button color="primary" onClick={props.onConfirm}>Confirm</Button>
                </Row>
                )
            }
        </Aux>  
    );  
};

export default ChooseFileConfirmClearButtons;