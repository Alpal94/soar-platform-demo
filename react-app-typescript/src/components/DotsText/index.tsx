import * as React from 'react';
import './index.css';

interface SpanDotsProps {
    text: string;
}

const DotsText: React.SFC<SpanDotsProps> = (props) => {

    return (
        <span className="dotdotdot">{props.text}</span>
    );
};

export default DotsText;