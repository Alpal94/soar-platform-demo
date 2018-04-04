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
using Newtonsoft.Json;
using Amazon.Lambda.APIGatewayEvents;
using System.Net;
using Soar.Core.Helpers;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace Soar.Download.Details
{
    public class Function
    {
        private readonly IStorageService _storageService;

        public Function() {}

        public Function(IStorageService storageService)
        {
            _storageService = storageService;
        }

        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest req, ILambdaContext context)
        {
            context.Logger.LogLine(JsonConvert.SerializeObject(req));
            var detailsReq = JsonConvert.DeserializeObject<DownloadDetailsReq>(req.Body);
            using (var storageService = _storageService == null? new DynamoDbStorageService() : _storageService)
            {
                var res = new DownloadDetailsRes()
                {
                    challenge = Guid.NewGuid().To32CharactesString(),
                    secret = Guid.NewGuid().To32CharactesString(),
                };
                var success = await storageService.PutSecret(res.secret, res.challenge, detailsReq.address, detailsReq.fileHash);
                if (success)
                {
                    return new APIGatewayProxyResponse()
                    {
                        Headers = APIGatewayHelpers.GetResponseHeaders(),
                        Body = JsonConvert.SerializeObject(res),
                        StatusCode = 200
                    };
                }
                throw new SoarException("Error during inserting secret in db.");
            }
        }

    }
}
