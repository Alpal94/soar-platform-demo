var Soar = artifacts.require("./Soar.sol");
var PricingManual = artifacts.require("./PricingManual.sol");

module.exports = function(deployer) {
  let promises = [];
  promises.push(deployer.deploy(PricingManual));
  promises.push(deployer.deploy(Soar));
  Promise.all(promises).then(results => {
    return Soar.deployed();
  }).then(instance => {
    return instance.setPricingContract(PricingManual.address);
  });
};
