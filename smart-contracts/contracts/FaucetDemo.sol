pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/**
 * @title Standard ERC20 token
 *
 */
 
contract FaucetDemo is Ownable, Pausable {
    
    ERC20 private skymapTokenContract;
    address public wallet;
    address public skymapTokenAddress;

    uint256 public INDIVIDUAL_CAP = 1000 * (uint(10) ** 18);
    uint256 public WAITING_PERIOD = 24 * 60 * 60 * 1000;

    mapping(address => uint256) public distributions;

    event Transfer(address indexed account, uint256 value);

    function FaucetDemo(address _walletAddress) public {
        wallet = _walletAddress;
    }
    
    function setWalletAddress(address _walletAddress) onlyOwner public {
        wallet = _walletAddress;
    }
    
    function setSkymapTokenContract(address _skymapTokenAddress) onlyOwner external {
        skymapTokenAddress = _skymapTokenAddress;
        skymapTokenContract = ERC20(_skymapTokenAddress);
    }

    function getSKYMTokens() external {
        require(block.timestamp > (distributions[msg.sender] + WAITING_PERIOD));
        distributions[msg.sender] = block.timestamp;
        skymapTokenContract.transferFrom(wallet, msg.sender, INDIVIDUAL_CAP);
        Transfer(msg.sender, INDIVIDUAL_CAP);
    }
}