using Soar.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Soar.Core.Ethereum
{
    public interface IEthereumService
    {
        Task<SecretDetails> GetSecretDetails(string transactionHash, VerificationEventType type);
    }
}
