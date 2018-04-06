var truffleContract = require('truffle-contract');

var Promise = require('bluebird');
var SkymapTokenContract = require('./contracts/SkymapTokenDemo.json')

/**
 * @class
 */
function SkymapToken(web3, address) {
    this.web3 = web3;
    let skymapTokenContract = truffleContract(SkymapTokenContract);
    skymapTokenContract.setProvider(this.web3.currentProvider);
    this.skymapTokenPromise = skymapTokenContract.at(address);
}

SkymapToken.prototype.approve = function(soarAddress, price, address) {
    console.log('Approve: SoarAddres ', soarAddress, ' Price ', price)
    return this.skymapTokenPromise.then(instance => {
        console.log(instance)
        return instance.approve(soarAddress, price, {from: address});
    }).then(res => {
        return res;
    });
}

SkymapToken.prototype.approveAndBuy = function(soarAddress, price, data, address) {
    console.log('ApproveAndBuy: SoarAddres ', soarAddress, ' Price ', price, ' Data ', data)
    return this.skymapTokenPromise.then(instance => {
        console.log(instance)
        return instance.approve(soarAddress, price, data, {from: address});
    }).then(res => {
        return res;
    });
}

module.exports = SkymapToken;