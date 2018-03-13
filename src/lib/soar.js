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

Soar.prototype.uploadFile = function(file, address) {
  return this.soarPromise
    .then((soar) => {
      return soar.fileUploadAsync(file.previewUrl, file.url, file.pointWKT, file.metadata, file.fileHash, this.web3.toWei(file.price), { from: address })
    }).then(res => {
      return res;
    });
}

Soar.prototype.watchUploadEvents = function(emitter) {
  return this.soarPromise
    .then((soar) => {
      var uploadEvent = soar.Upload({}, {fromBlock: 0, blockTo: 'latest'});
      uploadEvent.watch(emitter);
    });
}

Soar.prototype.watchMyPurchaseEvents = function(address, emitter) {
  return this.soarPromise
    .then((soar) => {
      var myPurchaseEvent = soar.Sale({buyer: address}, {fromBlock: 0, blockTo: 'latest'});
      myPurchaseEvent.watch(emitter);
    });
}

module.exports = Soar;
