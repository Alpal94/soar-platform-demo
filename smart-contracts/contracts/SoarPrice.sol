pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";

/**
 * @title Soar
 *
 */
 
contract SoarPrice is Ownable, Pausable {

    uint256 private defaultPrice = 1 * (uint(10) ** 16);

    mapping (bytes12 => uint256) internal prices;


    function SoarPrice() public {
    }

    function getPrice(bytes12 _geoHash) whenNotPaused public view returns (
        uint256 price_
    ) {
        price_ = defaultPrice;
    }

}