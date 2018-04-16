var Soar = artifacts.require("./Soar.sol");
var PricingManual = artifacts.require("./PricingManual.sol");
var SkymapTokenDemo = artifacts.require("./SkymapTokenDemo.sol");
var FaucetDemo = artifacts.require("./FaucetDemo.sol");

/*
* This script is only for local development. For other deployments needs to be updated.
*/
module.exports = function(deployer) {
  let networkId = web3.version.network;
  switch (networkId) {
    case '5777':
      runGanacheScript(web3, deployer).then(res => {
        console.log('Deployed on network: ', networkId);
      });
      break;
    default:
      console.log('Network is not supported: ', networkId);
      break;
  }
};

function runGanacheScript(web3, deployer) {
  const owner = web3.eth.accounts[0];
  const wallet = web3.eth.accounts[9];
  const allowance = web3.toWei(1000000);

  let promises = [
    deployer.deploy(SkymapTokenDemo, owner),
    deployer.deploy(FaucetDemo, owner),
    deployer.deploy(PricingManual),
    deployer.deploy(Soar)
  ];
  return Promise.all(promises).then(results => {
    let promises = [
      Soar.deployed(),
      SkymapTokenDemo.deployed(),
      FaucetDemo.deployed()
    ];
    return Promise.all(promises);
  }).then(results => {
    let soar = results[0];
    let token = results[1];
    let faucet = results[2];

    promises = [
      soar.setPricingContract(PricingManual.address),
      soar.setSkymapTokenContract(SkymapTokenDemo.address),
      soar.setWalletAddress(wallet),
      faucet.setSkymapTokenContract(SkymapTokenDemo.address),
      token.approve(FaucetDemo.address, allowance)
    ];
    return Promise.all(promises);
  });
}
