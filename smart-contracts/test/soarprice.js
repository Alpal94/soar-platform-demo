const SoarPrice = artifacts.require("SoarPrice");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

  contract('SoarPrice', function ([owner, buyer]) {
    const geoHash = 'u2g1jwq8nyj6'
    const defaultPrice = new BigNumber(10000000000000000);
    
    beforeEach(async function () {
      this.soarPrice = await SoarPrice.new();
    });
  
    it("..default price is 0.01 after deployment", async function () {
      let expected = new BigNumber(0);
      let price = await this.soarPrice.getPrice(geoHash);
      price.should.be.bignumber.equal(defaultPrice);
    });

    
  
  });
  