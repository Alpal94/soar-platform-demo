var Promise = require('bluebird');
var SoarContract = require('./contracts/Soar.json')

/**
 * @class
 */
function Soar(web3, address) {
  this.web3 = web3;
  const soarContract = web3.eth.contract(SoarContract.abi);
  this.soarPromise = Promise.resolve(Promise.promisifyAll(soarContract.at(address)));
}

Soar.prototype.filesCount = function(callback) {
  return this.soarPromise
    .then((soar) => {
      return soar.filesCountAsync();
    }).then(res => {
      return res;
    });
}

Soar.prototype.verificationSale = function(challenge, fileHash, address) {
  return this.soarPromise
    .then((soar) => {
      console.log('Call verification: ', challenge, ' - ', fileHash)
      return soar.verificationSaleAsync(challenge, fileHash, { from: address })
    }).then(res => {
      console.log(res)
      
      return res;
    }).catch(err => {
      console.log(err)
    });
}

Soar.prototype.verificationUpload = function(challenge, fileHash, address) {
  return this.soarPromise
    .then((soar) => {
      console.log('Call verification: ', challenge, ' - ', fileHash)
      return soar.verificationUploadAsync(challenge, fileHash, { from: address })
    }).then(res => {
      console.log(res)
      
      return res;
    });
}

Soar.prototype.uploadFile = function(previewUrl, url, pointWKT, metadata, fileHash, geohash, address) {
  return this.soarPromise
    .then((soar) => {
      return soar.fileUploadAsync(previewUrl, url, pointWKT, geohash, metadata, fileHash, { from: address })
    }).then(res => {
      return res;
    });
}

Soar.prototype.buyFileData = function(fileHash, challenge) {
  return this.soarPromise
    .then((soar) => {
      return soar.buyFile.getData(fileHash, challenge);
    }).then(res => {
      return res;
    });
}

Soar.prototype.buyFile = function(fileHash, challenge, address) {
  return this.soarPromise
    .then((soar) => {
      return soar.buyFileAsync(fileHash, challenge, { from: address })
    }).then(res => {
      return res;
    });
}

Soar.prototype.getPriceForFile = function(fileHash) {
  return this.soarPromise
    .then((soar) => {
      return soar.getPriceForFileAsync(fileHash)
    }).then(res => {
      return res;
    });
}

Soar.prototype.fileExists = function(fileHash, address) {
  return this.soarPromise
    .then((soar) => {
      return soar.fileExistsAsync(this.web3.fromAscii(fileHash))
    }).then(res => {
      return res;
    });
}

Soar.prototype.watchForVerificationSaleEvent = function(challenge, resolve, reject) {
  return this.soarPromise
    .then((soar) => {
      var verificationEvent = soar.VerificationSale({challenge: challenge}, {fromBlock: 0, toBlock: 'latest'});
      var emitter = (err, res) => {
        verificationEvent.stopWatching();
        if(res) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
      verificationEvent.watch(emitter);
    });
}

Soar.prototype.watchForVerificationUploadEvent = function(challenge, resolve, reject) {
  return this.soarPromise
    .then((soar) => {
      var verificationEvent = soar.VerificationUpload({challenge: challenge}, {fromBlock: 0, toBlock: 'latest'});
      var emitter = (err, res) => {
        verificationEvent.stopWatching();
        if(res) {
          console.log('VerificationUploadEvent: ', res)
          resolve(true);
        } else {
          resolve(false);
        }
      }
      verificationEvent.watch(emitter);
    });
}

Soar.prototype.watchUploadEvents = function(emitter) {
  return this.soarPromise
    .then((soar) => {
      var uploadEvent = soar.Upload({}, {fromBlock: 0, toBlock: 'latest'});
      uploadEvent.watch(emitter);
    });
}

Soar.prototype.watchMyPurchaseEvents = function(address, emitter) {
  return this.soarPromise
    .then((soar) => {
      var myPurchaseEvent = soar.Sale({buyer: address}, {fromBlock: 0, toBlock: 'latest'});
      myPurchaseEvent.watch(emitter);
    });
}

module.exports = Soar;
