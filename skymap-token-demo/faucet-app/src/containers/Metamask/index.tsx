import * as React from 'react';

interface MetamaskProps extends React.Props<Metamask> {
};

interface MetamaskState {
}

//TODO: update this component to show user dialog for metamask first and then eventually
//      to let him choose infura to see some information but not be able to perform any action
//      blockchain

class Metamask extends React.Component<MetamaskProps, MetamaskState> {

    static contextTypes = {
        web3: React.PropTypes.object
    };

    setWeb3() {
        let web3 = this.context.web3;
        if (web3.instance == null && !web3.loading) {
            web3.setWeb3('https://rinkeby.infura.io/trgLCqvmmrvTb46D5Iz4'); 
        }
    }

    public render(): React.ReactElement<{}> {
        let network = 'undefined';
        let setWeb3Button;
        if(this.context.web3.instance){
            network = this.context.web3.instance.version.network;
        } else {
            setWeb3Button = (<button onClick={() => this.setWeb3()}>Set default</button>);
        }

        return (
            <div>
                Your network: {network}{setWeb3Button}
            </div>
        );
    }
}

export default Metamask;
