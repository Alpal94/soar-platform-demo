import * as React from 'react';
import * as PropTypes from 'prop-types';
import Web3Helper from '../../lib/web3-helper';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;
import { selectMessage, selectUserInfo } from './selectors';
import { Prompt } from 'react-router';
import { Progress } from 'reactstrap';
import DotsText from '../../components/DotsText';
import Info from '../../components/Notifications/Info';
import { fetchUserInfoAction } from './actions';
import './index.css';
import { UserInfo } from '../../lib/model';

interface NotificationsProps extends React.Props<Notifications> {
    message?: string;
    info: UserInfo;
    userInfoFetch: (web3: any) => void;
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

    componentDidMount() {
        let web3 = this.context.web3.instance;
        this.props.userInfoFetch(web3);
    }

    componentDidUpdate() {
        if (this.props.message) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = () => null;
        }
    }

    public render(): React.ReactElement<{}> {
        const { message, info  } = this.props;
        let content: any;
        if (message) {
            content = (
                <Progress animated value="100">
                    <DotsText text={message} />
                </Progress>
            );
        } else {
            content = (
                <Info
                    network={info.network}
                    wallet={info.wallet}
                    balance={info.balance}
                    symbol={'SKYM'}
                />
            );
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
        message: selectMessage(),
        info: selectUserInfo()
    });
}

function mapDispatchToProps(dispatch: any) {
    return {
        userInfoFetch: (web3: any): void => {
            dispatch(fetchUserInfoAction(web3));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
