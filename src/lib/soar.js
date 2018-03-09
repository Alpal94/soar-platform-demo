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
      return soar.fileUploadAsync(file.previewUrl, file.url, file.pointWKT, file.metadata, file.fileHash, file.price, { from: address })
    }).then(res => {
      return res;
    });
}

module.exports = Soar;
