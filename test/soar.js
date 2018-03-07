const Soar = artifacts.require("Soar");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

  contract('Soar', function ([owner, investor, wallet, purchaser]) {
    
    beforeEach(async function () {
      this.soar = await Soar.new();
    });
  
    it("..name is set correctly", async function () {
      const name = await this.soar.name();
      name.should.be.equal('Soar Test Contract');
    });
  
  });
  