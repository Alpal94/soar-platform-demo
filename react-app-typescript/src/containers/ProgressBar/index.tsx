import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;
import { selectMessage } from './selectors';
import { Prompt } from 'react-router';

import { Progress } from 'reactstrap';

import './index.css';

interface ProgressBarProps extends React.Props<ProgressBar> {
    message?: string;
    router: any;
}

interface ProgressBarState {
}

class ProgressBar extends React.Component<ProgressBarProps, ProgressBarState> {

    static contextTypes = {
        progressBar: PropTypes.object
    };

    componentDidUpdate() {
        if (this.props.message) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = () => null;
        }
    }

    render(): React.ReactElement<{}> {
        let message = this.props.message;
        return (
            <div>
                {message &&
                    <Progress animated value="100">
                        <span className="dotdotdot">{message}</span>
                    </Progress>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);