import * as React from 'react';
import * as PropTypes from 'prop-types';
import Web3Helper from '../../lib/web3-helper';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;
import { selectMessage } from './selectors';
import { Prompt } from 'react-router';
import { Progress } from 'reactstrap';
import DotsText from '../../components/DotsText';
import './index.css';

interface NotificationsProps extends React.Props<Notifications> {
    message?: string;
}

interface NotificationsState {
}

//TODO: update this component to show user dialog for metamask first and then eventually
//      to let him choose infura to see some information but not be able to perform any action
//      blockchain

class Notifications extends React.Component<NotificationsProps, NotificationsState> {

    static contextTypes = {
        web3: PropTypes.object
    };

    setWeb3() {
        let web3 = this.context.web3;
        if (web3.instance == null && !web3.loading) {
            web3.setWeb3('https://rinkeby.infura.io/trgLCqvmmrvTb46D5Iz4');
        }
    }

    componentDidUpdate() {
        if (this.props.message) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = () => null;
        }
    }

    public render(): React.ReactElement<{}> {
        let message = this.props.message;

        let network = 'undefined';
        let setWeb3Button;
        if (this.context.web3.instance) {
            network = Web3Helper.getCurrentNetworkName(this.context.web3.instance);
        } else {
            setWeb3Button = (<button onClick={() => this.setWeb3()}>Set default</button>);
        }
        let content: any;
        if (message) {
            content = (
                <Progress animated value="100">
                    <DotsText text={message} />
                </Progress>
            )
        } else {
            content = (<div>Your network: {network}{setWeb3Button}</div>);
        }

        return (
            <div className="notifications">
                {content}
            </div>

        );
    }
}

function mapStateToProps() {
    return createStructuredSelector({
        message: selectMessage()
    });
}

function mapDispatchToProps(dispatch: any) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
