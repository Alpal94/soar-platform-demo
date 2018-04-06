pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./IPricing.sol";

/**
 * @title Manual Pricing
 *
 */
 
contract PricingManual is Ownable, IPricing {

    uint256 private defaultPrice = 1 * (uint(10) ** 18);

    mapping (bytes5 => uint256) internal prices;

    function PricingManual() public {
    }

    function getPrice(bytes12 _geoHash) whenNotPaused public view returns (
        uint256 price_
    ) {
        price_ = prices[bytes5(_geoHash)];
        if(price_ == 0){
            price_ = defaultPrice;
        }
    }

    function setPrice(bytes5 _geoHash, uint256 _price) onlyOwner public {
        prices[_geoHash] = _price;
    }

}