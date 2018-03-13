pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";

/**
 * @title Soar
 *
 */
 
contract Soar is Ownable, Pausable {

    struct FileUpload {
        address owner;
        uint256 price;
        string metadata;
    }

    uint public filesCount = 0;

    mapping (address => mapping (string => uint)) internal owners;
    mapping (string => FileUpload) internal files;
    mapping (string => mapping (address => uint)) internal sales;

    event Upload(address owner, string previewUrl, string url, string pointWKT, string metadata, string fileHash, uint price);
    event Sale(string indexed fileHash, address indexed buyer, uint price);

    function Soar() public {
    }

    function fileUpload(string _previewUrl, string _url, string _pointWKT, string _metadata, string _fileHash, uint _price) whenNotPaused public {
        require(_price > 0);
        files[_fileHash].owner = msg.sender;
        files[_fileHash].price = _price;
        files[_fileHash].metadata = _metadata;
        owners[msg.sender][_fileHash] = 0;
        filesCount++;
        Upload(msg.sender, _previewUrl, _url, _pointWKT, _metadata, _fileHash, _price);
    }

    function getFileDetails(string _fileHash) whenNotPaused public view returns (
            address owner_,
            uint price_,
            string metadata_
        ) {
            owner_ = files[_fileHash].owner;
            price_ = files[_fileHash].price;
            metadata_ = files[_fileHash].metadata;
    }

    function buyFile(string _fileHash) whenNotPaused external payable {
        uint weiAmount = msg.value;
        uint256 price = files[_fileHash].price;
        require(weiAmount == price);
        require(sales[_fileHash][msg.sender] == 0);
        sales[_fileHash][msg.sender] = weiAmount;
        owners[files[_fileHash].owner][_fileHash]++;
        Sale(_fileHash, msg.sender, price);
    }

    function verifySale(string _fileHash) whenNotPaused public view returns (
            bool success_
        ) {
            uint price = sales[_fileHash][msg.sender];
            success_ = price > 0;
    }

}