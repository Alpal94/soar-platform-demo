const PricingManual = artifacts.require("PricingManual");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const geoHash = "u2g1jwqbj78e";
const geoHash2 = "u2g1jefg453h";
const geoHash3 = "i2g1jwqbj78e";
const selectedGeoHash = "u2g1j";
const defaultPrice = new BigNumber(10000000000000000);
const selectedPrice = new BigNumber(220000000000000000);

contract('PricingManual', function ([owner, buyer]) {
  
  beforeEach(async function () {
    this.pricingManual = await PricingManual.new();
  });
  
  it("..default price is 0.01 after deployment", async function () {
    let expected = new BigNumber(0);
    let price = await this.pricingManual.getPrice(geoHash);
    price.should.be.bignumber.equal(defaultPrice);

  });
  
  it("..only owner can change the price", async function () {
    await this.pricingManual.setPrice(selectedGeoHash, selectedPrice, {from: buyer});
    let price = await this.pricingManual.getPrice(geoHash);
    price.should.be.bignumber.equal(defaultPrice);

    await this.pricingManual.setPrice(selectedGeoHash, selectedPrice, {from: owner});
    let price2 = await this.pricingManual.getPrice(geoHash);
    price2.should.be.bignumber.equal(selectedPrice);

  });
  
  it("..the price has changed after set new value", async function () {
    await this.pricingManual.setPrice(selectedGeoHash, selectedPrice);
    let price = await this.pricingManual.getPrice(geoHash);
    price.should.be.bignumber.equal(selectedPrice);
    let price2 = await this.pricingManual.getPrice(geoHash2);
    price2.should.be.bignumber.equal(selectedPrice);
    let price3 = await this.pricingManual.getPrice(geoHash3);
    price3.should.be.bignumber.equal(defaultPrice);

  });

});
  