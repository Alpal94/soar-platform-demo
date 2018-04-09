pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/token/ERC827/ERC827Token.sol";

/**
 * @title Standard ERC20 token
 *
 */
 
contract SkymapToken is ERC827Token {

    string public constant symbol = "SKYM";
    string public constant name = "Skymap";
    uint8 public constant decimals = 18;
    uint public INITIAL_SUPPLY = 500000000 * (uint(10) ** decimals);

    function SkymapToken(address beneficiary) public {
        require(beneficiary != address(0));
        totalSupply_ = INITIAL_SUPPLY;
        balances[beneficiary] = INITIAL_SUPPLY;
        Transfer(0x0, beneficiary, INITIAL_SUPPLY);
    }

}