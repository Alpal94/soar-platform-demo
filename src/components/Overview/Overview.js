import React, { Component } from 'react';
import UploadDetails from './UploadDetails';

class Overview extends Component {

    render() {
        return (
        <div>
            <h1>Statistics</h1>
            <p>File counts: {this.props.soar.filesCount}</p>
            <hr/>
            {Object.keys(this.props.soar.uploads).map(key => 
                <UploadDetails key={key} {...this.props.soar.uploads[key]}/>
                
            )}
                
        </div>
        );
    }
}

export default Overview;