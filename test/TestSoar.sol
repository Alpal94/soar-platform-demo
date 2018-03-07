pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Soar.sol";

contract TestSoar {

  function testNumber() {
    Soar soar = Soar(DeployedAddresses.Soar());

    uint expected = 12;

    Assert.equal(soar.number(), expected, "Number should be 12");
  }

}
