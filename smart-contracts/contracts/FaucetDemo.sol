pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/**
 * @title Faucet contract for Soar demo platform
 *
 */
 
contract FaucetDemo is Ownable, Pausable {
    
    ERC20 private skymapTokenContract;
    address public wallet;
    address public skymapTokenAddress;

    uint256 public individualCap;
    //block.timestamp is in seconds
    uint256 public waitingPeriod;

    mapping(address => uint256) public distributions;

    event Transfer(address indexed account, uint256 value);

    function FaucetDemo(address _walletAddress) public {
        wallet = _walletAddress;
        individualCap = 1000 * (uint(10) ** 18);
        waitingPeriod = 24 * 60 * 60;
    }

    function setWaitingPeriod(uint256 _waitingPeriod) onlyOwner external {
        waitingPeriod = _waitingPeriod;
    }

    function setIndividualCap(uint256 _individualCap) onlyOwner external {
        individualCap = _individualCap;
    }
    
    function setWalletAddress(address _walletAddress) onlyOwner external {
        wallet = _walletAddress;
    }
    
    function setSkymapTokenContract(address _skymapTokenAddress) onlyOwner external {
        skymapTokenAddress = _skymapTokenAddress;
        skymapTokenContract = ERC20(_skymapTokenAddress);
    }

    function getSKYMTokens() external {
        require(block.timestamp > (distributions[msg.sender] + waitingPeriod));
        distributions[msg.sender] = block.timestamp;
        skymapTokenContract.transferFrom(wallet, msg.sender, individualCap);
        emit Transfer(msg.sender, individualCap);
    }
}