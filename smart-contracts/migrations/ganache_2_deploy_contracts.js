var fs = require('fs');

module.exports = function ganache(web3, deployer, artifacts){
    var Soar = artifacts.require("./Soar.sol");
    var PricingManual = artifacts.require("./PricingManual.sol");
    var SkymapTokenDemo = artifacts.require("./SkymapTokenDemo.sol");
    var FaucetDemo = artifacts.require("./FaucetDemo.sol");

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
        faucet.setWalletAddress(owner),
        token.approve(FaucetDemo.address, allowance, {from: owner})
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
        "5777": soar.address
      },
      "Faucet": {
        "5777": faucetDemo.address
      },
      "SkymapToken": {
        "5777": skymapTokenDemo.address
      }
    };
    return writeObjectInFile(configFile, "../react-app-typescript/src/lib/config.local.json");
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
  