import React, { Component } from 'react';

class Overview extends Component {

    render() {
        return (
        <div>
            <h1>Statistics</h1>
            <p>File counts: {this.props.soar.filesCount}</p>
        </div>
        );
    }
}

export default Overview;