const SkymapToken = artifacts.require("SkymapTokenDemo");
const Faucet = artifacts.require("FaucetDemo");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const initialSupply = new BigNumber(web3.toWei(500000000));
const initialFaucetApproved = new BigNumber(web3.toWei(100000000));
const intialIndividualCap = new BigNumber(web3.toWei(1000));
const updatedIndividualCap = new BigNumber(web3.toWei(1000));
const intitialWaitingPeriod = new BigNumber(86400);
const updatedWaitingPeriod = new BigNumber(2);
const txSuccess = new BigNumber(1);
const txFailure = new BigNumber(0);

contract('FaucetDemo', function ([owner, user1, user2]) {
  
  beforeEach(async function () {
    this.skymapToken = await SkymapToken.new(owner);
    this.faucet = await Faucet.new(owner);
    await this.skymapToken.approve(this.faucet.address, initialFaucetApproved, { from: owner});
    await this.faucet.setSkymapTokenContract(this.skymapToken.address, { from: owner});
  });

  it("..intit values are set correctly", async function () {
    let allowance = await this.skymapToken.allowance(owner, this.faucet.address);
    allowance.should.be.bignumber.equal(initialFaucetApproved);
    let balanceOwner = await this.skymapToken.balanceOf(owner);
    balanceOwner.should.be.bignumber.equal(initialSupply);
    let individualCap = await this.faucet.individualCap();
    individualCap.should.be.bignumber.equal(intialIndividualCap);
    let waitingPeriod = await this.faucet.waitingPeriod();
    waitingPeriod.should.be.bignumber.equal(intitialWaitingPeriod);
  });

  it("..getSKYMTokens: transfer 1000 SKYM to sender", async function () {
    let tx = await this.faucet.getSKYMTokens({from: user1});
    let status = new BigNumber(tx.receipt.status);
    status.should.be.bignumber.equal(txSuccess);

    let userBalance = await this.skymapToken.balanceOf(user1);
    userBalance.should.be.bignumber.equal(intialIndividualCap);
  });

  it("..setWaitingPeriod: waiting period should change", async function () {
    await this.faucet.setWaitingPeriod(updatedWaitingPeriod, {from: owner});
    let waitingPeriod = await this.faucet.waitingPeriod();
    waitingPeriod.should.be.bignumber.equal(updatedWaitingPeriod);
  });

  it("..setIndividualCap: individual cap should change", async function () {
    await this.faucet.setIndividualCap(updatedIndividualCap, {from: owner});
    let individualCap = await this.faucet.individualCap();
    individualCap.should.be.bignumber.equal(updatedIndividualCap);
  });

  it("..getSKYMTokens: sender should wait 24 hours to get more SKYM", async function () {
    let tx = await this.faucet.getSKYMTokens({from: user1});
    let status = new BigNumber(tx.receipt.status);
    status.should.be.bignumber.equal(txSuccess);

    await this.faucet.getSKYMTokens({from: user1}).should.be.rejectedWith(Error);
    
    let userBalance = await this.skymapToken.balanceOf(user1);
    userBalance.should.be.bignumber.equal(intialIndividualCap);
  });

  it("..getSKYMTokens: sender should get more SKYM after waiting period", async function () {
    await this.faucet.setWaitingPeriod(updatedWaitingPeriod, {from: owner});
    await this.faucet.getSKYMTokens({from: user1});
    await sleep(2 * 1000 * updatedWaitingPeriod);
    await this.faucet.getSKYMTokens({from: user1});
    let userBalance = await this.skymapToken.balanceOf(user1);
    userBalance.should.be.bignumber.equal(2 * intialIndividualCap);
  });


});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
