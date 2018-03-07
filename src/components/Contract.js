import React, { Component } from 'react';
import { LinearProgress } from 'material-ui/Progress';

class Contract extends Component {
  
  render() {
    const soarName = this.props.soar && <p>{this.props.soar.name}</p>;
    const progress = this.props.isFetching && <LinearProgress />
    return (
      <div style={{padding: '1em', margin: '1em', border: '1px solid black'}}>
        <h1>Contract</h1>
        <div>{progress}</div>
        <button onClick={() => this.props.handleSoarName(this.props.web3)}>Soar</button>
        <div>
          {soarName}
        </div>
      </div>
    );
  }
}

export default Contract;