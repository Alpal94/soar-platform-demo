import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


const fileExif = (props) => {
    console.log(props.exifKey + ": " + props.exifValue)

    const isString = (typeof props.exifValue === 'string' || props.exifValue instanceof String)
    const isUndefined = (typeof props.exifValue === "undefined")

    if (isString) {
        return (<p>{props.exifKey}: {props.exifValue}</p>)
    } else if (isUndefined) {
        return (<p>{props.exifKey}: <i>Undefined</i></p>)
    } else {
        return (<p>{props.exifKey}: {props.exifValue.toString()}</p>)
    }
}


export default fileExif;