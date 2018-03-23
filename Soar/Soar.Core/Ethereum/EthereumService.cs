using Nethereum.RPC.Eth.DTOs;
using Nethereum.Web3;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Soar.Core.Models;

namespace Soar.Core.Ethereum
{
    public class EthereumService : IEthereumService
    {
        private readonly string INFURA_ETH_ADDRESS = "https://rinkeby.infura.io/trgLCqvmmrvTb46D5Iz4";

        private static string ABI = @"[ { 'constant': true, 'inputs': [ { 'name': '_fileHash', 'type': 'bytes32' } ], 'name': 'fileExists', 'outputs': [ { 'name': 'exists_', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'unpause', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_fileHash', 'type': 'bytes32' } ], 'name': 'buyFile', 'outputs': [], 'payable': true, 'stateMutability': 'payable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_challange', 'type': 'bytes32' } ], 'name': 'verification', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'paused', 'outputs': [ { 'name': '', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_previewUrl', 'type': 'string' }, { 'name': '_url', 'type': 'string' }, { 'name': '_pointWKT', 'type': 'string' }, { 'name': '_metadata', 'type': 'string' }, { 'name': '_fileHash', 'type': 'bytes32' }, { 'name': '_price', 'type': 'uint256' } ], 'name': 'fileUpload', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'pause', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'owner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'filesCount', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'newOwner', 'type': 'address' } ], 'name': 'transferOwnership', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_fileHash', 'type': 'bytes32' } ], 'name': 'verifySale', 'outputs': [ { 'name': 'success_', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'owner', 'type': 'address' }, { 'indexed': false, 'name': 'previewUrl', 'type': 'string' }, { 'indexed': false, 'name': 'url', 'type': 'string' }, { 'indexed': false, 'name': 'pointWKT', 'type': 'string' }, { 'indexed': false, 'name': 'metadata', 'type': 'string' }, { 'indexed': false, 'name': 'fileHash', 'type': 'bytes32' }, { 'indexed': false, 'name': 'price', 'type': 'uint256' } ], 'name': 'Upload', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'buyer', 'type': 'address' }, { 'indexed': true, 'name': 'fileHash', 'type': 'bytes32' }, { 'indexed': false, 'name': 'price', 'type': 'uint256' } ], 'name': 'Sale', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'account', 'type': 'address' }, { 'indexed': true, 'name': 'challange', 'type': 'bytes32' } ], 'name': 'Verification', 'type': 'event' }, { 'anonymous': false, 'inputs': [], 'name': 'Pause', 'type': 'event' }, { 'anonymous': false, 'inputs': [], 'name': 'Unpause', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'previousOwner', 'type': 'address' }, { 'indexed': true, 'name': 'newOwner', 'type': 'address' } ], 'name': 'OwnershipTransferred', 'type': 'event' } ]";
        private static string CONTRACT_ADDRESS = "0x84734ad2e474c00661867caf5c656a2398fc4d7b";
        
        public async Task<SecretDetails> GetSecretDetails(string transactionHash)
        {
            var web3 = new Web3(INFURA_ETH_ADDRESS);
            var contract = web3.Eth.GetContract(ABI, CONTRACT_ADDRESS);
            var receipt = await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(transactionHash);
            if (receipt == null)
                throw new SoarException("The receipt for transaction hash is not available");
            if (receipt.Logs.HasValues)
                throw new SoarException("The receipt doesn't contain any logs");

            var log = receipt.Logs.First().ToObject<FilterLog>();
            var verificationEvent = contract.GetEvent("Verification");
            if (!verificationEvent.IsLogForEvent(log))
                throw new SoarException("The event in transaction is not a Verification event");

            var eventVerification = verificationEvent.DecodeAllEventsForEvent<VerificationEvent>(new[] { log }).First();
            var secretDetails = new SecretDetails()
            {
                Challenge = Encoding.Default.GetString(eventVerification.Event.Challange),
                Address = eventVerification.Event.Sender
            };
            return secretDetails;
        }
    }
}
