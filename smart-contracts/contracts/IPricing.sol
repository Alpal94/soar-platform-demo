pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";

contract IPricing is Pausable{
    function getPrice(bytes12 _geoHash) public view returns ( uint256 price_);
}