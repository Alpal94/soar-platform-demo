const Soar = artifacts.require("Soar");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

  const previewUrl = "previewUrl";
  const url = "url";
  const pointWKT = "pointWKT";
  const geoHash = "u2g1jwqbj78e";
  const metadata = "metadata";
  const fileHash = "438269b95b997fc736cf8c4801843db3";
  const price = new BigNumber(100000000000000000);
  const txSuccess = new BigNumber(1);
  const txFailure = new BigNumber(0);

  contract('Soar', function ([owner, buyer, buyer2]) {


    
    beforeEach(async function () {
      this.soar = await Soar.new();
    });
  
    it("..files count is 0 after deployment", async function () {
      let expected = new BigNumber(0);
      let filesCount = await this.soar.filesCount();
      filesCount.should.be.bignumber.equal(expected);
    });

    it("..files count is 1 after 1 upload", async function () {
      let expected = new BigNumber(1);
      await this.soar.fileUpload(previewUrl, url, pointWKT, geoHash, metadata, fileHash, price, {from: owner});
      let filesCount = await this.soar.filesCount();
      filesCount.should.be.bignumber.equal(expected);
    });

    it("..event FileUpload was fired after upload", async function () {
      let res = await this.soar.fileUpload(previewUrl, url, pointWKT, geoHash, metadata, fileHash, price, {from: owner});
      res.logs.length.should.be.equal(1);
      let event = res.logs[0];
      event.event.should.be.equal("Upload");
      event.args.owner.should.be.equal(owner);
      event.args.previewUrl.should.be.equal(previewUrl);
      event.args.url.should.be.equal(url);
      event.args.pointWKT.should.be.equal(pointWKT);
      event.args.metadata.should.be.equal(metadata);
      event.args.price.should.be.bignumber.equal(price);
      web3.toUtf8(event.args.fileHash).should.be.equal(fileHash);
      web3.toUtf8(event.args.geoHash).should.be.equal(geoHash);

    });

    it("..buy file method call is succefull", async function () {
      let res = await this.soar.fileUpload(previewUrl, url, pointWKT, geoHash, metadata, fileHash, price, {from: owner});
      let tx = await this.soar.buyFile(fileHash, 'challenge', { value: price, from: buyer}).should.be.fulfilled;
      let status = new BigNumber(tx.receipt.status);
      //testing the status of transaction, now converting it in BigNumber but there is maybe better way 
      // to check the status but for now it is working
      status.should.be.bignumber.equal(txSuccess);
    });
    
    it("..verify sale after purchase file", async function () {
      let res = await this.soar.fileUpload(previewUrl, url, pointWKT, geoHash, metadata, fileHash, price, {from: owner});
      let tx = await this.soar.buyFile(fileHash, 'challenge',  { value: price, from: buyer}).should.be.fulfilled;
      let tx1 = await this.soar.verificationSale('challenge', fileHash, { from: buyer}).should.be.fulfilled;
      let status1 = new BigNumber(tx1.receipt.status);
      status1.should.be.bignumber.equal(txSuccess);
      let tx2 = await this.soar.verificationSale('challenge', fileHash, { from: buyer2}).should.be.fulfilled;
      let status2 = new BigNumber(tx2.receipt.status);
      status2.should.be.bignumber.equal(txFailure);
      
    });
  
  });
  