var fs = require('fs');

module.exports = function ganache(web3, deployer, artifacts){
    var Soar = artifacts.require("./Soar.sol");
    var PricingManual = artifacts.require("./PricingManual.sol");
    var SkymapTokenDemo = artifacts.require("./SkymapTokenDemo.sol");
    var FaucetDemo = artifacts.require("./FaucetDemo.sol");

    // first account on the company trezor
    const tokenOwner = '0x0B34Ba8E61d949D4c766DB70a8B9f646A9209865';
    // second account on the company trezor
    const soarWallet = '0x801040013a3Bd1EcE0Fc9993e2A5f28CC6B1F42C';
  
    let promises = [
      deployer.deploy(SkymapTokenDemo, tokenOwner),
      deployer.deploy(FaucetDemo, tokenOwner),
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
        soar.setWalletAddress(soarWallet),
        faucet.setSkymapTokenContract(SkymapTokenDemo.address)
      ];
      return Promise.all(promises);
    }).then(results => {
      promises = [
        updateLocalConfigFilePromise(Soar, FaucetDemo, SkymapTokenDemo),
        updateContractAbi(Soar),
        updateContractAbi(FaucetDemo),
        updateContractAbi(SkymapTokenDemo)
      ]
      return Promise.all(promises);
    });
  }
  
  function updateContractAbi(contract){
    let file = {
      "contractName" : contract.contractName,
      "abi" : contract.abi
    };
    return writeObjectInFile(file, "../react-app-typescript/src/lib/contracts/" + contract.contractName + ".json");
  }
  
  function updateLocalConfigFilePromise(soar, faucetDemo, skymapTokenDemo) {
    let configFile = {
      "Soar": {
        "4": soar.address
      },
      "Faucet": {
        "4": faucetDemo.address
      },
      "SkymapToken": {
        "4": skymapTokenDemo.address
      }
    };
    return writeObjectInFile(configFile, "../react-app-typescript/src/lib/config.rinkeby.json");
  }
  
  function writeObjectInFile(object, path) {
    return new Promise(function (resolve, reject) {
      let jsonString = JSON.stringify(object, null, 4);
      fs.writeFile(path, jsonString, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve()
        }
      });
    });
  }
  