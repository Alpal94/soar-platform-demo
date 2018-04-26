import * as SparkMD5 from 'spark-md5';
import * as Geohash from 'geo-hash';
const EXIF = require('exif-js');
import { LatLng } from './model';

//TODO check the implementation of all methods in this class
export default class UploadHelper {

    public static readExifData(file: File): Promise<any> {
        return new Promise(function (resolve, reject) {
            EXIF.getData(file, function (this: any) {
                resolve(EXIF.getAllTags(this));
            });
        });
    }

    public static parseLocation(exif: any): LatLng {
        if (exif.GPSLatitude === undefined || 
            exif.GPSLongitude ===  undefined ||
            exif.GPSLatitudeRef === undefined ||
            exif.GPSLongitudeRef === undefined) {
                let latLng: LatLng = {
                    lat: '0',
                    lng: '0'
                };
                return latLng;
        }

        let lat = this.toDecimal(exif.GPSLatitude);
        if (exif.GPSLatitudeRef === 'S') {
            lat = -lat;
        }
        let lon = this.toDecimal(exif.GPSLongitude);
        if (exif.GPSLongitudeRef === 'W') {
            lon = -lon;
        }
        let latlng: LatLng = {
            lat: lat,
            lng: lon
        };
        return latlng;
    }

    private static toDecimal(number: any) {
        return number[0].numerator + number[1].numerator /
            (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
    };

    public static getMd5Hash(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            var blobSlice = File.prototype.slice;
            var chunkSize = 2097152;                             // Read in chunks of 2MB
            var chunks = Math.ceil(file.size / chunkSize);
            var currentChunk = 0;
            var spark = new SparkMD5.ArrayBuffer();
            var fileReader = new FileReader();

            fileReader.onload = function (e: any) {
                // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
                spark.append(e.target.result);                   // Append array buffer
                currentChunk++;

                if (currentChunk < chunks) {
                    var start = currentChunk * chunkSize;
                    var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
                    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
                } else {
                    // console.log('finished loading');
                    let hash = spark.end();
                    // console.info('computed hash', hash);  // Compute hash
                    resolve(hash);
                }
            };

            fileReader.onerror = function () {
                reject('oops, something went wrong');
                // console.warn('oops, something went wrong.');
            };

            var start = currentChunk * chunkSize;
            var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));

        });
    }

    public static computeGeohash(latlng: LatLng): string {
        return Geohash.encode(latlng.lat, latlng.lng, 12);
    }
}