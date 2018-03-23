using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Soar.Core.Models;
using Soar.Core.Extensions;
using Soar.Core.Services;
using Amazon.DynamoDBv2;
using Amazon.Runtime;
using Amazon;
using Amazon.DynamoDBv2.Model;
using Soar.Core;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace Soar.Download.Details
{
    public class Function
    {
        private readonly IStorageService _storageService;

        public Function()
        {
            _storageService = new DynamoDbStorageService();
        }

        public Function(IStorageService storageService)
        {
            _storageService = storageService;
        }

        public async Task<DownloadDetailsRes> FunctionHandler(DownloadDetailsReq req, ILambdaContext context)
        {
            try
            {
                var res = new DownloadDetailsRes()
                {
                    challenge = Guid.NewGuid().To32CharactesString(),
                    secret = Guid.NewGuid().To32CharactesString(),
                };
                var success = await _storageService.PutSecret(res.secret, res.challenge, req.address);
                if (success)
                    return res;

                throw new SoarException("Error during inserting secret in db.");
            }
            finally
            {
                _storageService.Dispose();
            }
            


        }

    }
}
