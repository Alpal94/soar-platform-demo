import React from 'react';

const exifDetails = (props) => {

    var gcd = function(a, b) {
        if (b < 0.0000001) return a;                // Since there is a limited precision we need to limit the value.
        return gcd(b, Math.floor(a % b));           // Discard any fractions due to limitations in precision.
    };

    var shutterSpeed = (1 / Math.pow(2, props.exifData["ShutterSpeedValue"]));
    var shutterSpeedLength = shutterSpeed.toString().length - 2;
    var shutterSpeedDenominator = Math.pow(10, shutterSpeedLength);
    var shutterSpeedNumerator = shutterSpeed * shutterSpeedDenominator;
    var shutterSpeedDivisor = gcd(shutterSpeedNumerator, shutterSpeedDenominator);
    shutterSpeedNumerator /= shutterSpeedDivisor;
    shutterSpeedDenominator /= shutterSpeedDivisor;
    var shutterSpeedStr = Math.floor(shutterSpeedNumerator) + " / " + Math.floor(shutterSpeedDenominator);

    return (
        <div>
            <p>F-Stop: {props.exifData["FNumber"].toString()}</p>
            <p>Exposure time: {props.exifData["ExposureTime"].toString()}</p>
            <p>Shutter speed: {shutterSpeedStr}</p>

        </div>
    )
}

export default exifDetails;