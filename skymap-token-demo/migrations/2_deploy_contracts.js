var SkymapToken = artifacts.require("./SkymapToken.sol");

module.exports = function(deployer) {
  let promises = [];
  const wallet = web3.eth.accounts[0];
  promises.push(deployer.deploy(SkymapToken, wallet));
  Promise.all(promises).then(results => {
    console.log('Deployed');
  });
};
