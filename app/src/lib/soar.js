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

Soar.prototype.uploadVerification = function(challenge, address) {
  return this.soarPromise
    .then((soar) => {
      return soar.uploadVerificationAsync(challenge, { from: address })
    }).then(res => {
      return res;
    });
}

Soar.prototype.uploadFile = function(previewUrl, url, pointWKT, metadata, fileHash, price, address) {
  return this.soarPromise
    .then((soar) => {
      console.log(previewUrl, url, pointWKT, metadata, fileHash, this.web3.toWei(price))
      return soar.fileUploadAsync(previewUrl, url, pointWKT, metadata, fileHash, this.web3.toWei(price), { from: address })
    }).then(res => {
      return res;
    });
}

Soar.prototype.buyFile = function(fileHash, price, address) {
  return this.soarPromise
    .then((soar) => {
      return soar.buyFileAsync(fileHash, { from: address, value: this.web3.toWei(price) })
    }).then(res => {
      return res;
    });
}

Soar.prototype.verifyFile = function(fileHash, address) {
  return this.soarPromise
    .then((soar) => {
      return soar.verifySaleAsync(fileHash, {from: address})
    }).then(res => {
      return res;
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
      console.log(address)
      //todo add filtering by buyr address
      var myPurchaseEvent = soar.Sale({fromBlock: 0, toBlock: 'latest'});
      console.log(myPurchaseEvent)
      myPurchaseEvent.watch(emitter);

    });
}

module.exports = Soar;
