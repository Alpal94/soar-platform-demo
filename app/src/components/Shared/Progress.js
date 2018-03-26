import React from 'react';
import './Progress.css';

export const Progress = (props) => (
    <div className="progress">
        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" >
        <span>{props.text}<span className="dotdotdot"></span></span>
        </div>
    </div>
)

export default Progress;