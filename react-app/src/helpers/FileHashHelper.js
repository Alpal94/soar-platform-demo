import SparkMD5 from 'spark-md5'

//todo refactor this code
const getMd5Hash = (file) => {
    return new Promise((resolve, reject) => {
        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        var chunkSize = 2097152;                             // Read in chunks of 2MB
        var chunks = Math.ceil(file.size / chunkSize);
        var currentChunk = 0;
        var spark = new SparkMD5.ArrayBuffer();
        var fileReader = new FileReader();
        
        fileReader.onload = function (e) {
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


export default getMd5Hash;


