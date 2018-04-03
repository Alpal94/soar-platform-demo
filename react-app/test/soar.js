const Soar = artifacts.require("Soar");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

  contract('Soar', function ([owner, buyer, buyer2]) {
    const previewUrl = "previewUrl";
    const url = "url";
    const pointWKT = "pointWKT";
    const metadata = "metadata";
    const fileHash = "e0d123e5f316bef78bfdf5a008837577";
    const price = new BigNumber(100000000000000000);

    
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
      await this.soar.fileUpload(previewUrl, url, pointWKT, metadata, fileHash, price, {from: owner});
      let filesCount = await this.soar.filesCount();
      filesCount.should.be.bignumber.equal(expected);
    });

    it("..file details should be same as uploaded", async function () {
      let res = await this.soar.fileUpload(previewUrl, url, pointWKT, metadata, fileHash, price, {from: owner});
      let fileDetails = await this.soar.getFileDetails(fileHash);
      fileDetails[0].should.be.equal(owner);
      fileDetails[1].should.be.bignumber.equal(price);
      fileDetails[2].should.be.equal(metadata);
    });

    it("..event FileUpload was fired after upload", async function () {
      let res = await this.soar.fileUpload(previewUrl, url, pointWKT, metadata, fileHash, price, {from: owner});
      res.logs.length.should.be.equal(1);
      let event = res.logs[0];
      event.event.should.be.equal("Upload");
      event.args.owner.should.be.equal(owner);
      event.args.previewUrl.should.be.equal(previewUrl);
      event.args.url.should.be.equal(url);
      event.args.pointWKT.should.be.equal(pointWKT);
      event.args.metadata.should.be.equal(metadata);
      event.args.fileHash.should.be.equal(fileHash);
      event.args.price.should.be.bignumber.equal(price);
    });

    it("..buy file method call is succefull", async function () {
      let res = await this.soar.fileUpload(previewUrl, url, pointWKT, metadata, fileHash, price, {from: owner});
      let tx = await this.soar.buyFile(fileHash, { value: price, from: buyer}).should.be.fulfilled;
      let status = new BigNumber(tx.receipt.status);
      //testing the status of transaction, now converting it in BigNumber but there is maybe better way 
      // to check the status but for now it is working
      status.should.be.bignumber.equal(new BigNumber(1));
    });
    
    it("..verify sale after purchase file", async function () {
      let res = await this.soar.fileUpload(previewUrl, url, pointWKT, metadata, fileHash, price, {from: owner});
      await this.soar.buyFile(fileHash, { value: price, from: buyer}).should.be.fulfilled;
      let success = await this.soar.verifySale(fileHash, { from: buyer});
      success.should.be.true;
      let failure = await this.soar.verifySale(fileHash, { from: buyer2});
      failure.should.be.false;
    });
  
  });
  