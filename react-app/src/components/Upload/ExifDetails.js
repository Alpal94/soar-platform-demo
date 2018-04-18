import React from 'react';
import ExifField from './ExifField';

const exifDetails = (props) => {

    if (props.visible && props.exifdata) {
        return (
            <div>
                { 
                    Object.keys(props.exifdata).map( (key, index) => {
                        return (
                            <ExifField exifKey={key} exifValue={props.exifdata[key]} />
                        )
                    })
                })
            </div>
        )
    } else {
        return null
    }
}

export default exifDetails;