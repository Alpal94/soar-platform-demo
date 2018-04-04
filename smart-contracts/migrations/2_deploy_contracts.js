var Soar = artifacts.require("./Soar.sol");
var PricingManual = artifacts.require("./PricingManual.sol");


module.exports = function(deployer) {
  deployer.deploy(PricingManual);
  deployer.deploy(Soar);
};
