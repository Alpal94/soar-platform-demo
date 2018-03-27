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
    }

    uint public filesCount = 0;

    mapping (address => mapping (bytes32 => uint)) internal owners;
    mapping (bytes32 => FileUpload) internal files;
    mapping (bytes32 => mapping (address => uint)) internal sales;

    event Upload(address indexed owner, string previewUrl, string url, string pointWKT, string metadata, bytes32 fileHash, uint price);
    event Sale(address indexed buyer, bytes32 indexed fileHash, uint price);
    event Verification(address account, bytes32 indexed challenge, bytes32 fileHash);

    function Soar() public {
    }

    function verification(bytes32 _challenge, bytes32 _fileHash) whenNotPaused public {
        Verification(msg.sender, _challenge, _fileHash);
    }

    function fileUpload(string _previewUrl, string _url, string _pointWKT, string _metadata, bytes32 _fileHash, uint _price) whenNotPaused public {
        require(_price > 0);
        files[_fileHash].owner = msg.sender;
        files[_fileHash].price = _price;
        owners[msg.sender][_fileHash] = 0;
        filesCount++;
        Upload(msg.sender, _previewUrl, _url, _pointWKT, _metadata, _fileHash, _price);
    }

    function buyFile(bytes32 _fileHash, bytes32 _challenge) whenNotPaused external payable {
        require(files[_fileHash].owner != msg.sender);
        uint weiAmount = msg.value;
        uint256 price = files[_fileHash].price;
        require(weiAmount == price);
        require(sales[_fileHash][msg.sender] == 0);
        sales[_fileHash][msg.sender] = weiAmount;
        owners[files[_fileHash].owner][_fileHash]++;
        Sale(msg.sender, _fileHash, price);
        Verification(msg.sender, _challenge, _fileHash);
    }

    function verifySale(bytes32 _fileHash) whenNotPaused public view returns (
            bool success_
    ) {
        uint price = sales[_fileHash][msg.sender];
        success_ = price > 0;
    }

    function fileExists(bytes32 _fileHash) whenNotPaused public view returns (
        bool exists_
    ) {
        exists_ = files[_fileHash].owner != address(0);
    }

}