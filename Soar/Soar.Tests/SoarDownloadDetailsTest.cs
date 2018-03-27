using Amazon;
using Amazon.DynamoDBv2;
using Amazon.Lambda.TestUtilities;
using Soar.Core.Models;
using Soar.Core.Services;
using Soar.Download.Details;
using Soar.Tests.Mocks;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Soar.Tests
{
    public class SoarDownloadDetailsTest
    {
        [Fact]
        public async Task TestSoarDownloadDetails()
        {
            IStorageService storageService = new StorageServiceMock();
            var function = new Function(storageService);
            var context = new TestLambdaContext();

            var req = new DownloadDetailsReq()
            {
                address = "eth-address"
            };
            //DownloadDetailsRes res = await function.FunctionHandler(req, context);
            //SecretDetails secretDetails = await storageService.GetSecretDetails(res.secret);
            //Assert.Equal(req.address, secretDetails.Address);
        }
    }
}
