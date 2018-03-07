pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Soar
 *
 */
 
contract Soar is Ownable {

    string public constant name = "Soar Test Contract";
    uint public constant number = 12;

    function Soar() public {
    }

}