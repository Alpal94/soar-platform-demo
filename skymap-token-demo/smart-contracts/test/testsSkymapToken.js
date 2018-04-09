const SkymapToken = artifacts.require("SkymapToken");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const initialSupply = new BigNumber(web3.toWei(500000000));

contract('SkymapToken', function ([owner, user1, user2]) {
  
  beforeEach(async function () {
    this.skymapToken = await SkymapToken.new(owner);
  });

  it("..intit supply is 500 000 000 SKYM", async function () {
    let supply = await this.skymapToken.INITIAL_SUPPLY();
    supply.should.be.bignumber.equal(initialSupply);
  });
});
