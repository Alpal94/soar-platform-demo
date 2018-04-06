var Soar = artifacts.require("./Soar.sol");
var PricingManual = artifacts.require("./PricingManual.sol");
var SkymapTokenDemo = artifacts.require("./SkymapTokenDemo.sol");

/*
* This script is only for local development. For other deployments needs to be updated.
*/
module.exports = function(deployer) {
  const wallet = web3.eth.accounts[9];
  const user1 = web3.eth.accounts[1];
  const user2 = web3.eth.accounts[2];
  const user3 = web3.eth.accounts[3];
  const transferValue = web3.toWei(25000);

  let promises = [];
  promises.push(deployer.deploy(SkymapTokenDemo));
  promises.push(deployer.deploy(PricingManual));
  promises.push(deployer.deploy(Soar));
  Promise.all(promises).then(results => {
    promises = [];
    promises.push(Soar.deployed());
    promises.push(SkymapTokenDemo.deployed());
    return Promise.all(promises);
  }).then(results => {
    promises = [];

    let soar = results[0];
    promises.push(soar.setPricingContract(PricingManual.address));
    promises.push(soar.setSkymapTokenContract(SkymapTokenDemo.address));
    promises.push(soar.setWalletAddress(wallet));

    let token = results[1];
    promises.push(token.transfer(user2, transferValue));
    promises.push(token.transfer(user3, transferValue));
    return Promise.all(promises);
  });
};
