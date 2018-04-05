var SkymapToken = artifacts.require("./SkymapToken.sol");

module.exports = function(deployer) {
  let promises = [];
  promises.push(deployer.deploy(SkymapToken));
  Promise.all(promises).then(results => {
    console.log('Deployed');
  });
};
