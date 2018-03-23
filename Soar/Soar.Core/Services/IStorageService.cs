using Soar.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Soar.Core.Services
{
    public interface IStorageService : IDisposable
    {
        Task<bool> PutSecret(string secret, string challenge, string address);
        Task<SecretDetails> GetSecretDetails(string secret);
    }
}
