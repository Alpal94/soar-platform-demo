pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./IPricing.sol";

/**
 * @title Soar
 *
 */
 
contract Soar is Ownable, Pausable {

    struct FileUpload {
        address owner;
        bytes12 geoHash;
    }

    uint public filesCount = 0;
    IPricing private pricingContract;

    mapping (bytes32 => FileUpload) internal files;
    mapping (bytes32 => mapping (address => uint)) internal sales;
    mapping (address => uint256) internal balances;

    event Upload(address indexed owner, string previewUrl, string url, string pointWKT, bytes12 geoHash, string metadata, bytes32 fileHash);
    event Sale(address indexed buyer, bytes32 indexed fileHash, uint price);
    event VerificationSale(address account, bytes32 indexed challenge, bytes32 fileHash);
    event VerificationUpload(address account, bytes32 indexed challenge, bytes32 fileHash);

    function Soar() public {
    }

    function setPricingContract(address _pricingAddress) onlyOwner public {
        pricingContract = IPricing(_pricingAddress);
    }

    function getPrice(bytes12 _geoHash) whenNotPaused public view returns (
        uint256 price_
    ) {
        price_ = pricingContract.getPrice(_geoHash);
    }

    function getPriceForFile(bytes32 _fileHash) whenNotPaused public view returns (
        uint256 price_
    ) {
        require(files[_fileHash].owner != address(0));
        price_ = pricingContract.getPrice(files[_fileHash].geoHash);
    }

    function verificationSale(bytes32 _challenge, bytes32 _fileHash) whenNotPaused public {
        require(sales[_fileHash][msg.sender] > 0);
        VerificationSale(msg.sender, _challenge, _fileHash);
    }

    function verificationUpload(bytes32 _challenge, bytes32 _fileHash) whenNotPaused public {
        require(files[_fileHash].owner == address(0));
        VerificationUpload(msg.sender, _challenge, _fileHash);
    }

    function fileUpload(string _previewUrl, string _url, string _pointWKT, bytes12 _geoHash, string _metadata, bytes32 _fileHash) whenNotPaused public {
        require(files[_fileHash].owner == address(0));
        files[_fileHash].owner = msg.sender;
        files[_fileHash].geoHash = _geoHash;
        filesCount++;
        Upload(msg.sender, _previewUrl, _url, _pointWKT, _geoHash, _metadata, _fileHash);
    }

    function buyFile(bytes32 _fileHash, bytes32 _challenge) whenNotPaused external payable {
        address owner = files[_fileHash].owner;
        // verify user is not owner
        require(owner != msg.sender);
        // verify user has not bought file
        require(sales[_fileHash][msg.sender] == 0);
        uint256 weiAmount = msg.value;
        uint256 price = pricingContract.getPrice(files[_fileHash].geoHash);
        // verify price matches amount sent with call
        require(weiAmount == price);
        // update data and fire events
        sales[_fileHash][msg.sender] = weiAmount;
        balances[owner] = balances[owner] + weiAmount;
        Sale(msg.sender, _fileHash, price);
        VerificationSale(msg.sender, _challenge, _fileHash);
    }

    function fileExists(bytes32 _fileHash) whenNotPaused public view returns (
        bool exists_
    ) {
        exists_ = files[_fileHash].owner != address(0);
    }

}