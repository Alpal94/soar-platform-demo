pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./IPricing.sol";

/**
 * @title Manual Pricing
 *
 */
 
contract PricingManual is Ownable, IPricing {

    uint256 private defaultPrice = 1 * (uint(10) ** 18);

    mapping (bytes2 => uint256) internal prices2;
    mapping (bytes3 => uint256) internal prices3;
    mapping (bytes4 => uint256) internal prices4;
    mapping (bytes5 => uint256) internal prices5;
    mapping (bytes6 => uint256) internal prices6;
    mapping (bytes7 => uint256) internal prices7;

    function PricingManual() public {
    }

    function getPrice(bytes12 _geoHash) whenNotPaused public view returns (
        uint256 price_
    ) {
        if(prices2[bytes2(_geoHash)] > 0){
            price_ = prices2[bytes2(_geoHash)];
        }
        if(prices3[bytes3(_geoHash)] > 0){
            price_ = prices3[bytes3(_geoHash)];
        }
        if(prices4[bytes4(_geoHash)] > 0){
            price_ = prices4[bytes4(_geoHash)];
        }
        if(prices5[bytes5(_geoHash)] > 0){
            price_ = prices5[bytes5(_geoHash)];
        }
        if(prices6[bytes6(_geoHash)] > 0){
            price_ = prices6[bytes6(_geoHash)];
        }
        if(prices7[bytes7(_geoHash)] > 0){
            price_ = prices7[bytes7(_geoHash)];
        }
        if(price_ == 0){
            price_ = defaultPrice;
        }
    }

    function setPrice(bytes12 _geoHash, uint256 _price, uint256 _precision) public {
        setPriceInternal(_geoHash, _price, _precision);
    }

    function setPriceInternal(bytes12 _geoHash, uint256 _price, uint256 _precision) internal {
        if(_precision == 2){
            prices2[bytes2(_geoHash)] = _price;
        } else if (_precision == 3) {
            prices3[bytes3(_geoHash)] = _price;
        } else if (_precision == 4) {
            prices4[bytes4(_geoHash)] = _price;
        } else if (_precision == 5) {
            prices5[bytes5(_geoHash)] = _price;
        } else if (_precision == 6) {
            prices6[bytes6(_geoHash)] = _price;
        } else if (_precision == 7) {
            prices7[bytes7(_geoHash)] = _price;
        }
    }
    
    function setPrices(bytes12[] _geoHashes, uint256 _price, uint256 _precision) public {
        for (uint256 i = 0; i < _geoHashes.length; i++) {
            setPriceInternal(_geoHashes[i], _price, _precision);
        }
    }
}