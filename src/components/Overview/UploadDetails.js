import React from 'react';

const UploadDetails = function(props) {
    console.log(props)
    return (
        <div>
            File hash: {props.fileHash} <br/>
            Owner: {props.owner} <br/>
            PointWKT: {props.pointWKT} <br/>
            Preview: {props.previewUrl} <br/>
            Price: {props.price} SOAR 
            <hr/>
        </div>
    );
  }

  export default UploadDetails;