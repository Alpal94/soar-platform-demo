using Soar.Core.Models;
using Soar.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Soar.Tests.Mocks
{
    public class StorageServiceMock : IStorageService
    {
        private readonly Dictionary<string, SecretDetails> _db;

        public StorageServiceMock()
        {
            _db = new Dictionary<string, SecretDetails>();
        }
        
        public Task<bool> PutSecret(string secret, string challenge, string address)
        {
            var item = new SecretDetails()
            {
                Challenge = challenge,
                Address = address
            };
            _db.Add(secret, item);
            return Task.FromResult(true);
        }

        public Task<SecretDetails> GetSecretDetails(string secret)
        {
            SecretDetails secretDetails = null;
            _db.TryGetValue(secret, out secretDetails);
            return Task.FromResult(secretDetails);
        }
        
        public void Dispose() {}

    }
}
