using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.TestUtilities;
using Soar.Authorizer.Ethereum;
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
            var function = new Function();
            var context = new TestLambdaContext();

            var req = new APIGatewayCustomAuthorizerRequest()
            {
                Headers = new Dictionary<string, string>()
                {
                    { "soar-secret" , "deed582c-3ff3-4af2-bacc-b4ab9906509d" },
                    { "soar-transaction-hash" , "0x7d125658a5adbc1d5e246bc3fae01c1ed66451dd56dede706ee59bd56a24b1c4" }
                }
            };
            var upperCase = await function.FunctionHandler(req, context);
        }
    }


}
