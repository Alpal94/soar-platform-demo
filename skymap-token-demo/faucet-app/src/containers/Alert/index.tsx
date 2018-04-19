import * as React from 'react';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;
import { Alert as AlertBootstrap } from 'reactstrap';
import { selectMessage, selectType } from './selectors';
import { alertClearAction } from './actions';
import './index.css';

interface AlertProps extends React.Props<Alert> {
    message?: string;
    type?: Alert.Type;
    alertClear: () => void;
}

interface AlertState {
}

class Alert extends React.Component<AlertProps, AlertState> {

    constructor(props: AlertProps) {
        super(props);
    }

    render() {
        let color: string;
        switch (this.props.type) {
            case Alert.Type.Info:
                color = 'info';
                break;
            case Alert.Type.Success:
                color = 'success';
                break;
            case Alert.Type.Warning:
                color = 'warning';
                break;
            case Alert.Type.Error:
                color = 'danger';
                break;
            default:
                color = 'info';
                break;
        }
        return (
            <div>
                {this.props.message &&
                    <AlertBootstrap color={color} toggle={this.props.alertClear}>
                        {this.props.message}
                    </AlertBootstrap>
                }
            </div>
        );
    }
}

module Alert {
    export enum Type {
        Info,
        Success,
        Warning,
        Error
    }
}

function mapStateToProps() {
    return createStructuredSelector({
        message: selectMessage(),
        type: selectType()
    });
}

function mapDispatchToProps(dispatch: any) {
    return {
        alertClear: (): void => {
            dispatch(alertClearAction());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);