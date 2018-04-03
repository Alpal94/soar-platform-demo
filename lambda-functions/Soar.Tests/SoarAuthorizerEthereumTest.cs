using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.TestUtilities;
using Soar.Authorizer.Ethereum;
using Soar.Core.Services;
using Soar.Tests.Mocks;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Soar.Tests
{
    public class SoarAuthorizerEthereumTest
    {
        [Fact]
        public async Task TestSoarAuthorizerEthereum()
        {
            //todo rewrite this test with mocked ethereum service
            var secret = "768eafe9ba984e2ca799f8829738c0ba";
            var challenge = "63f20673bd324ab78c7b059ddad5cccf";
            var fileHash = "438269b95b997fc736cf8c4801843db3";
            var address = "0x7Bcbb6Ca8De198f97Ac9Bb3B263216EB1E22AA6D";

            IStorageService storageService = new StorageServiceMock();
            var temp = await storageService.PutSecret(secret, challenge, address, fileHash);

            var function = new Function(storageService);

            var context = new TestLambdaContext();

            var req = new APIGatewayCustomAuthorizerRequest()
            {
                QueryStringParameters = new Dictionary<string, string>()
                {
                    { "soarSecret" ,  "768eafe9ba984e2ca799f8829738c0ba"},
                    { "txnHash" , "0x5be37b8355d44138272e860b675fd91928b3ac77ec70f6825ad5543dee4b4c79" }
                },
                StageVariables = new Dictionary<string, string>()
                {
                    { "soar_contract_address", "0xf413a66fe07b49d2ca798acf6e43a47462e7081b" },
                    { "infura_address", "https://rinkeby.infura.io/trgLCqvmmrvTb46D5Iz4" }
                }
            };
            var upperCase = await function.FunctionHandler(req, context);
        }
    }


}
