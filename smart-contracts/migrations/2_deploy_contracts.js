const ganache = require('./ganache_2_deploy_contracts');

/*
* This script is only for local development. For other deployments needs to be updated.
*/
module.exports = function (deployer) {
  let networkId = web3.version.network;
  switch (networkId) {
    case '5777':
    Promise.resolve(ganache(web3, deployer, artifacts)).then(res => {
        console.log('Deployed on network: ', networkId);
      });
      break;
    default:
      console.log('Network is not supported: ', networkId);
      break;
  }
};