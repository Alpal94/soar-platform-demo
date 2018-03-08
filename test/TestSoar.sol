pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Soar.sol";

contract TestSoar {

  function testFilesCountAfterDeployed() {
    Soar soar = Soar(DeployedAddresses.Soar());

    uint expected = 0;

    Assert.equal(soar.filesCount(), expected, "Files count should 0");
  }

}
