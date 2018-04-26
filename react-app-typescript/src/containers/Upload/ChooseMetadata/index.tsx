import * as React from 'react';
import Aux from '../../../hoc/Aux';

interface ChooseMetadataProps {
    visible: boolean;
}

interface ChooseMetadataState {

}

class ChooseMetadata extends React.Component<ChooseMetadataProps, ChooseMetadataState> {


    public render(): React.ReactElement<{}> {
        return (
            <Aux>
                {this.props.visible &&
                    <h2>Step 3 - File details</h2>
                }
                
            </Aux>
        );
    }
}

export default ChooseMetadata;