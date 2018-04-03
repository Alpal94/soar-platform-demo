using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Xunit;
using Amazon.Lambda.TestUtilities;

using Soar.Core.Models;
using Soar.Upload.Details;

namespace Soar.Tests
{
    public class SoarUploadDetailsTest
    {
        [Fact]
        public async Task TestSoarUploadDetails()
        {
            var function = new Function();
            var context = new TestLambdaContext();
            var req = new UploadDetailsReq()
            {
                address = "eth-address",
                fileHash = "file-hash"
            };
            //var upperCase = await function.FunctionHandler(req, context);
        }
    }
}
