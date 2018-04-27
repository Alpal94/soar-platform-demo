const Soar = artifacts.require("Soar");
const PricingManual = artifacts.require("PricingManual");
const SkymapToken = artifacts.require("SkymapTokenDemo");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const previewUrl = "previewUrl";
const url = "url";
const pointWKT = "pointWKT";
const geoHash = "u2g1jwqbj78e";
const selectedGeoHash = "u2g1j";
const metadata = "metadata";
const fileHash = "438269b95b997fc736cf8c4801843db3";
const txSuccess = new BigNumber(1);
const zero = new BigNumber(0);
const txFailure = new BigNumber(0);
const defaultPrice = web3.toWei(1);
const challenge = "challenge"

contract('Soar', function ([owner, user1, user2, wallet]) {

  beforeEach(async function () {
    this.skymapToken = await SkymapToken.new(owner);
    this.soar = await Soar.new();
    this.pricingManual = await PricingManual.new();
    await this.soar.setPricingContract(this.pricingManual.address);
    await this.soar.setSkymapTokenContract(this.skymapToken.address);
    await this.soar.setWalletAddress(wallet);
  });

  it("listingsCount: returns 0 after deployment", async function () {
    let expected = new BigNumber(0);
    let filesCount = await this.soar.listingsCount();
    filesCount.should.be.bignumber.equal(expected);
  });

  it("uploadListing: is successfull and listingCounts returns 1", async function () {
    let tx = await this.soar.uploadListing(previewUrl, url, pointWKT, geoHash, metadata, fileHash, { from: owner });
    // TODO find better way how to check transaction success
    let status = new BigNumber(tx.receipt.status);
    status.should.be.bignumber.equal(txSuccess);

    let expected = new BigNumber(1);
    let listingsCount = await this.soar.listingsCount();
    listingsCount.should.be.bignumber.equal(expected);
  });

  it("uploadListing: events are fired correctly", async function () {
    let tx = await this.soar.uploadListing(previewUrl, url, pointWKT, geoHash, metadata, fileHash, { from: owner });
    tx.logs.length.should.be.equal(1);
    let event = tx.logs[0];
    event.event.should.be.equal("ListingUploaded");
    event.args.owner.should.be.equal(owner);
    event.args.previewUrl.should.be.equal(previewUrl);
    event.args.url.should.be.equal(url);
    event.args.pointWKT.should.be.equal(pointWKT);
    event.args.metadata.should.be.equal(metadata);
    web3.toUtf8(event.args.fileHash).should.be.equal(fileHash);
    web3.toUtf8(event.args.geoHash).should.be.equal(geoHash);
  });

  it("getPrice: returns price bigger than 0", async function () {
    let zero = new BigNumber(0);
    let price = await this.soar.getPrice(geoHash);
    price.should.be.bignumber.greaterThan(zero);
  });

  it("getPrice: returns price for fileHash bigger than 0", async function () {
    let zero = new BigNumber(0);
    await this.soar.uploadListing(previewUrl, url, pointWKT, geoHash, metadata, fileHash, { from: owner });
    let price = await this.soar.getListingPrice(fileHash);
    price.should.be.bignumber.greaterThan(zero);
  });

  it("getListingPrice: throws error for non existing file", async function () {
    await this.soar.getListingPrice(fileHash).should.be.rejectedWith(Error);
  });

  it("buyListing: is successfull", async function () {
    let res = await this.soar.uploadListing(previewUrl, url, pointWKT, geoHash, metadata, fileHash, { from: user1 });
    // transfer SKYM to the buyer and set allowance for soar contract to transfer it
    await this.skymapToken.transfer(user2, defaultPrice, { from: owner });
    await this.skymapToken.approve(this.soar.address, defaultPrice, { from: user2 });

    let tx = await this.soar.buyListing(fileHash, challenge, { from: user2 }).should.be.fulfilled;
    // TODO find better way how to check transaction success
    let status = new BigNumber(tx.receipt.status);
    status.should.be.bignumber.equal(txSuccess);
  });

  it("buyListing: skymap tokens are transfered to owner and wallet", async function () {
    let selectedPrice = web3.toWei(25);
    let expectedWalletCut = web3.toWei(1.25);
    let expectedOwnerCut = web3.toWei(23.75);

    let res = await this.soar.uploadListing(previewUrl, url, pointWKT, geoHash, metadata, fileHash, { from: user1 });

    // transfer SKYM to the buyer and set allowance for soar contract to transfer it
    await this.pricingManual.setPrice(selectedGeoHash, selectedPrice);
    await this.skymapToken.transfer(user2, selectedPrice, { from: owner });
    await this.skymapToken.approve(this.soar.address, selectedPrice, { from: user2 });

    // check that state is set up correctly before calling buyFile method
    let walletBal = await this.skymapToken.balanceOf(wallet);
    let fileOwnerBal = await this.skymapToken.balanceOf(user1);
    let buyerBal = await this.skymapToken.balanceOf(user2);
    let soarAllowance = await this.skymapToken.allowance(user2, this.soar.address);

    walletBal.should.be.bignumber.equal(zero);
    fileOwnerBal.should.be.bignumber.equal(zero);
    buyerBal.should.be.bignumber.equal(selectedPrice);
    soarAllowance.should.be.bignumber.equal(selectedPrice);

    let tx = await this.soar.buyListing(fileHash, challenge, { from: user2 }).should.be.fulfilled;

    // check the state after sale was made
    walletBal = await this.skymapToken.balanceOf(wallet);
    fileOwnerBal = await this.skymapToken.balanceOf(user1);
    buyerBal = await this.skymapToken.balanceOf(user2);
    soarAllowance = await this.skymapToken.allowance(user2, this.soar.address);

    walletBal.should.be.bignumber.equal(expectedWalletCut);
    fileOwnerBal.should.be.bignumber.equal(expectedOwnerCut);
    buyerBal.should.be.bignumber.equal(zero);
    soarAllowance.should.be.bignumber.equal(zero);
  });

  it("buyListing: events are fired correctly", async function () {
    let res = await this.soar.uploadListing(previewUrl, url, pointWKT, geoHash, metadata, fileHash, { from: user1 });
    // transfer SKYM to the buyer and set allowance for soar contract to transfer it
    await this.skymapToken.transfer(user2, defaultPrice, { from: owner });
    await this.skymapToken.approve(this.soar.address, defaultPrice, { from: user2 });

    let tx = await this.soar.buyListing(fileHash, challenge, { from: user2 }).should.be.fulfilled;

    tx.logs.length.should.be.equal(2);

    let saleEvent = tx.logs[0];
    saleEvent.event.should.be.equal("Sale");
    saleEvent.args.buyer.should.be.equal(user2);
    saleEvent.args.owner.should.be.equal(user1);
    web3.toUtf8(saleEvent.args.fileHash).should.be.equal(fileHash);
    saleEvent.args.price.should.be.bignumber.equal(defaultPrice);

    let verificationEvent = tx.logs[1];
    verificationEvent.event.should.be.equal("VerificationSale");
    verificationEvent.args.account.should.be.equal(user2);
    web3.toUtf8(verificationEvent.args.fileHash).should.be.equal(fileHash);
    web3.toUtf8(verificationEvent.args.challenge).should.be.equal(challenge);

  });

});