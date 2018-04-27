const PricingManual = artifacts.require("PricingManual");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const geoHash1 = "u2g1jwqbj78e";
const geoHash2 = "u2g1jefg453h";
const geoHash3 = "i2g1jwqbj78e";
const selectedGeoHash = "u2g1j";
const defaultPrice = web3.toWei(1);
const selectedPrice = web3.toWei(22);

contract('PricingManual', function ([owner, buyer]) {
  
  beforeEach(async function () {
    this.pricingManual = await PricingManual.new();
  });
  
  it("..initial price is 1", async function () {
    let expected = new BigNumber(0);
    let price = await this.pricingManual.getPrice(geoHash1);
    price.should.be.bignumber.equal(defaultPrice);

  });
  
  it("..setPrice: only owner can change the price", async function () {
    await this.pricingManual.setPrice(selectedGeoHash, selectedPrice, 2, {from: buyer}).should.be.rejectedWith(Error);;
    let price = await this.pricingManual.getPrice(geoHash1);
    price.should.be.bignumber.equal(defaultPrice);

    await this.pricingManual.setPrice(selectedGeoHash, selectedPrice, 2, {from: owner});
    let price2 = await this.pricingManual.getPrice(geoHash1);
    price2.should.be.bignumber.equal(selectedPrice);

  });
  
  it("..setPrice: the price was updated", async function () {
    await this.pricingManual.setPrice(selectedGeoHash, selectedPrice, 5);
    let price = await this.pricingManual.getPrice(geoHash1);
    price.should.be.bignumber.equal(selectedPrice);
    let price2 = await this.pricingManual.getPrice(geoHash2);
    price2.should.be.bignumber.equal(selectedPrice);
    let price3 = await this.pricingManual.getPrice(geoHash3);
    price3.should.be.bignumber.equal(defaultPrice);

  });

  it("..setPrice: the price precision 2 returns right price for whole geohash precision 2", async function () {
    let leftTop = "u2bpbpbpbpgw";
    let leftTopOut = "u1r4xjku9frm";
    let rightTop = "u2zzzzzzf4dq";
    let rightTopOut = "u9000020jkwv";
    let leftBottom = "u2017vj041u3";
    let leftBottomOut = "spzzvg4pfjh6";
    let rightBottom = "u2pe044908mt";
    let rightBottomOut = "sxbpev45z2dt";
    await this.pricingManual.setPrice("u2", selectedPrice, 2);
    let price = await this.pricingManual.getPrice(leftTop);
    price.should.be.bignumber.equal(selectedPrice);
    let priceOut = await this.pricingManual.getPrice(leftTopOut);
    priceOut.should.be.bignumber.equal(defaultPrice);
    
    price = await this.pricingManual.getPrice(rightTop);
    price.should.be.bignumber.equal(selectedPrice);
    priceOut = await this.pricingManual.getPrice(rightTopOut);
    priceOut.should.be.bignumber.equal(defaultPrice);

    price = await this.pricingManual.getPrice(leftBottom);
    price.should.be.bignumber.equal(selectedPrice);
    priceOut = await this.pricingManual.getPrice(leftBottomOut);
    priceOut.should.be.bignumber.equal(defaultPrice);

    price = await this.pricingManual.getPrice(rightBottom);
    price.should.be.bignumber.equal(selectedPrice);
    priceOut = await this.pricingManual.getPrice(rightBottomOut);
    priceOut.should.be.bignumber.equal(defaultPrice);
  });

  it("..setPrice: the price precision 7 returns right price only for precision 7", async function () {
    let leftTop = "u2g1jwxpkqwp";
    let leftTopOut = "u2g1jwz58j65";
    let rightTop = "u2g1jwxzukqh";
    let rightTopOut = "u2g1jyb4thnn";
    let leftBottom = "u2g1jwx0f444";
    let leftBottomOut = "spzzvg4pfjh6";
    let rightBottom = "u2g1jwxbmcnj";
    let rightBottomOut = "u2g1jy2pbknh";
    
    await this.pricingManual.setPrice("u2g1jwx", selectedPrice, 7);
    let price = await this.pricingManual.getPrice(leftTop);
    price.should.be.bignumber.equal(selectedPrice);
    let priceOut = await this.pricingManual.getPrice(leftTopOut);
    priceOut.should.be.bignumber.equal(defaultPrice);
    
    price = await this.pricingManual.getPrice(rightTop);
    price.should.be.bignumber.equal(selectedPrice);
    priceOut = await this.pricingManual.getPrice(rightTopOut);
    priceOut.should.be.bignumber.equal(defaultPrice);

    price = await this.pricingManual.getPrice(leftBottom);
    price.should.be.bignumber.equal(selectedPrice);
    priceOut = await this.pricingManual.getPrice(leftBottomOut);
    priceOut.should.be.bignumber.equal(defaultPrice);

    price = await this.pricingManual.getPrice(rightBottom);
    price.should.be.bignumber.equal(selectedPrice);
    priceOut = await this.pricingManual.getPrice(rightBottomOut);
    priceOut.should.be.bignumber.equal(defaultPrice);
  });
    
  it("..setPrices: the prices were updated", async function () {
    let price = web3.toWei(22);
    let geo1 = "u2g1jv8mmxwy";
    let geo2 = "u2g1msee9wqg";
    let geo3 = "u2g1nsgr1cp8";
    let geo4 = "u2g32t0k985w";
    let geohashes = ["u2g1j", "u2g1m", "u2g1n", "u2g32"];
    let not1 = "u2f9ez8umgt2";
    let not2 = "gcdyd6cqju9h";
    let not3 = "kkxn68n04f2v";
    let not4 = "5g7f5zz0sr47";
    let tx = await this.pricingManual.setPrices(geohashes, price, 5);
    let price1 = await this.pricingManual.getPrice(geo1);
    price1.should.be.bignumber.equal(price);
    let price2 = await this.pricingManual.getPrice(geo2);
    price2.should.be.bignumber.equal(price);
    let price3 = await this.pricingManual.getPrice(geo3);
    price3.should.be.bignumber.equal(price);
    let price4 = await this.pricingManual.getPrice(geo4);
    price4.should.be.bignumber.equal(price);
    let price5 = await this.pricingManual.getPrice(not1);
    price5.should.be.bignumber.equal(defaultPrice);
    let price6 = await this.pricingManual.getPrice(not2);
    price6.should.be.bignumber.equal(defaultPrice);
    let price7 = await this.pricingManual.getPrice(not3);
    price7.should.be.bignumber.equal(defaultPrice);
    let price8 = await this.pricingManual.getPrice(not4);
    price8.should.be.bignumber.equal(defaultPrice);

  });

});
  