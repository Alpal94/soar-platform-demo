pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "./IPricing.sol";

/**
 * @title Soar
 *
 */
 
contract Soar is Ownable, Pausable {

    struct Listing {
        address owner;
        bytes12 geoHash;
        mapping (address => uint) sales;
        uint256 salesCount;
    }

    // contracts
    IPricing private pricingContract;
    ERC20 private skymapTokenContract;

    // attributes
    uint public listingsCount = 0;
    mapping (bytes32 => Listing) internal listings;
    address wallet;

    // event definitions
    event ListingUploaded(address indexed owner, string previewUrl, string url, string pointWKT, bytes12 geoHash, string metadata, bytes32 fileHash);
    event Sale(address indexed buyer, address indexed owner, bytes32 indexed fileHash, uint price);
    event VerificationSale(address account, bytes32 indexed challenge, bytes32 fileHash);
    event VerificationUpload(address account, bytes32 indexed challenge, bytes32 fileHash);

    function Soar() public {
        wallet = msg.sender;
    }

    function setWalletAddress(address _walletAddress) onlyOwner public {
        wallet = _walletAddress;
    }

    function setPricingContract(address _pricingAddress) onlyOwner public {
        pricingContract = IPricing(_pricingAddress);
    }

    function setSkymapTokenContract(address _skymapTokenAddress) onlyOwner public {
        skymapTokenContract = ERC20(_skymapTokenAddress);
    }

    function getPrice(bytes12 _geoHash) whenNotPaused public view returns (
        uint256 price_
    ) {
        price_ = pricingContract.getPrice(_geoHash);
    }

    function getListingPrice(bytes32 _fileHash) whenNotPaused public view returns (
        uint256 price_
    ) {
        require(listings[_fileHash].owner != address(0));
        price_ = pricingContract.getPrice(listings[_fileHash].geoHash);
    }

    function verificationSale(bytes32 _challenge, bytes32 _fileHash) whenNotPaused public {
        require(listings[_fileHash].sales[msg.sender] > 0);
        VerificationSale(msg.sender, _challenge, _fileHash);
    }

    function verificationUpload(bytes32 _challenge, bytes32 _fileHash) whenNotPaused public {
        require(listings[_fileHash].owner == address(0));
        VerificationUpload(msg.sender, _challenge, _fileHash);
    }

    function uploadListing(string _previewUrl, string _url, string _pointWKT, bytes12 _geoHash, string _metadata, bytes32 _fileHash) whenNotPaused public {
        require(listings[_fileHash].owner == address(0));
        listings[_fileHash].owner = msg.sender;
        listings[_fileHash].geoHash = _geoHash;
        listingsCount++;
        ListingUploaded(msg.sender, _previewUrl, _url, _pointWKT, _geoHash, _metadata, _fileHash);
    }
    
    function buyListing(bytes32 _fileHash, bytes32 _challenge) whenNotPaused external {
        address owner = listings[_fileHash].owner;
        // verify user is not owner
        require(owner != msg.sender);
        // verify user has not bought file
        require(listings[_fileHash].sales[msg.sender] == 0);
        uint256 allowance = skymapTokenContract.allowance(msg.sender, this);
        uint256 balance = skymapTokenContract.balanceOf(msg.sender);
        uint256 price = pricingContract.getPrice(listings[_fileHash].geoHash);
        // verify balance and allowance are higher than price
        require(balance >= price);
        require(allowance >= price);

        // calculate cut for owner and for wallet
        uint256 ownerCut = (price / 100) * 95;
        uint256 walletCut = price - ownerCut;

        // tranfer skymap to file owner and soar
        skymapTokenContract.transferFrom(msg.sender, owner, ownerCut);
        skymapTokenContract.transferFrom(msg.sender, wallet, walletCut);
        // // update contract state
        listings[_fileHash].sales[msg.sender] = price;
        listings[_fileHash].salesCount++;
        // //fire events
        Sale(msg.sender, owner, _fileHash, price);
        VerificationSale(msg.sender, _challenge, _fileHash);
    }

    function fileExists(bytes32 _fileHash) whenNotPaused public view returns (
        bool exists_
    ) {
        require(msg.sender == address(0));
        exists_ = listings[_fileHash].owner != address(0);
    }

}