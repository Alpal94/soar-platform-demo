var SkymapToken = artifacts.require("./SkymapToken.sol");
var Faucet = artifacts.require("./Faucet.sol");

module.exports = function (deployer) {
  const wallet = web3.eth.accounts[0];
  const allowance = web3.toWei(100000);

  let skymapToken = deployer.deploy(SkymapToken, wallet);
  let faucet = deployer.deploy(Faucet, wallet);
  Promise.all([skymapToken, faucet]).then(results => {
    let skymapDeployed = SkymapToken.deployed();
    let faucetDeployed = Faucet.deployed();
    return Promise.all([skymapDeployed, faucetDeployed]);
  }).then(results => {
    let token = results[0];
    let faucet = results[1];
    let setSkymapContract = faucet.setSkymapTokenContract(SkymapToken.address);
    let approveFaucet = token.approve(Faucet.address, allowance);
    return Promise.all([setSkymapContract]);
  }).then(results => {
    console.log('Deployed');
  });
};
