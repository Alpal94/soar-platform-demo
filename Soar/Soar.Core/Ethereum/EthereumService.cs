using Nethereum.RPC.Eth.DTOs;
using Nethereum.Web3;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Soar.Core.Models;
using System.IO;
using Nethereum.Contracts;

namespace Soar.Core.Ethereum
{
    public class EthereumService : IEthereumService
    {
        private readonly string _infuraAddress;
        private readonly string _soarContractAddress;

        private static string ABI = @"[{'constant':true,'inputs':[{'name':'_fileHash','type':'bytes32'}],'name':'fileExists','outputs':[{'name':'exists_','type':'bool'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_challenge','type':'bytes32'},{'name':'_fileHash','type':'bytes32'}],'name':'verificationSale','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[],'name':'unpause','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'paused','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_previewUrl','type':'string'},{'name':'_url','type':'string'},{'name':'_pointWKT','type':'string'},{'name':'_metadata','type':'string'},{'name':'_fileHash','type':'bytes32'},{'name':'_price','type':'uint256'}],'name':'fileUpload','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[],'name':'pause','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_fileHash','type':'bytes32'},{'name':'_challenge','type':'bytes32'}],'name':'buyFile','outputs':[],'payable':true,'stateMutability':'payable','type':'function'},{'constant':true,'inputs':[],'name':'filesCount','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_challenge','type':'bytes32'},{'name':'_fileHash','type':'bytes32'}],'name':'verificationUpload','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'newOwner','type':'address'}],'name':'transferOwnership','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'inputs':[],'payable':false,'stateMutability':'nonpayable','type':'constructor'},{'anonymous':false,'inputs':[{'indexed':true,'name':'owner','type':'address'},{'indexed':false,'name':'previewUrl','type':'string'},{'indexed':false,'name':'url','type':'string'},{'indexed':false,'name':'pointWKT','type':'string'},{'indexed':false,'name':'metadata','type':'string'},{'indexed':false,'name':'fileHash','type':'bytes32'},{'indexed':false,'name':'price','type':'uint256'}],'name':'Upload','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'buyer','type':'address'},{'indexed':true,'name':'fileHash','type':'bytes32'},{'indexed':false,'name':'price','type':'uint256'}],'name':'Sale','type':'event'},{'anonymous':false,'inputs':[{'indexed':false,'name':'account','type':'address'},{'indexed':true,'name':'challenge','type':'bytes32'},{'indexed':false,'name':'fileHash','type':'bytes32'}],'name':'VerificationSale','type':'event'},{'anonymous':false,'inputs':[{'indexed':false,'name':'account','type':'address'},{'indexed':true,'name':'challenge','type':'bytes32'},{'indexed':false,'name':'fileHash','type':'bytes32'}],'name':'VerificationUpload','type':'event'},{'anonymous':false,'inputs':[],'name':'Pause','type':'event'},{'anonymous':false,'inputs':[],'name':'Unpause','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'previousOwner','type':'address'},{'indexed':true,'name':'newOwner','type':'address'}],'name':'OwnershipTransferred','type':'event'}]";
        
        public EthereumService(string infuraAddress, string soarContractAddress)
        {
            _infuraAddress = infuraAddress;
            _soarContractAddress = soarContractAddress;
        }

        public async Task<SecretDetails> GetSecretDetails(string transactionHash, VerificationEventType type)
        {
            var web3 = new Web3(_infuraAddress);
            var contract = web3.Eth.GetContract(ABI, _soarContractAddress);
            var receipt = await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(transactionHash);
            if (receipt == null || !receipt.Logs.HasValues)
                return null;

            var verificationEvent = contract.GetEvent(type.ToString());

            var logs = receipt.Logs
                .Select(l => l.ToObject<FilterLog>())
                .Where(fl => verificationEvent.IsLogForEvent(fl))
                .ToArray();

            var secretDetails = verificationEvent.DecodeAllEventsForEvent<VerificationEvent>(logs)
                .Select(ev => new SecretDetails()
                {
                    Challenge = Encoding.Default.GetString(ev.Event.Challange),
                    Address = ev.Event.Sender,
                    FileHash = Encoding.Default.GetString(ev.Event.FileHash)
                })
                .FirstOrDefault();
            return secretDetails;
        }

        
    }
}
