using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Soar.Core.Models;
using Soar.Core.Extensions;
using Soar.Core.Services;
using Soar.Core;
using Newtonsoft.Json;
using Amazon.Lambda.APIGatewayEvents;
using Soar.Core.Helpers;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace Soar.Upload.Details
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
            var baseUrl = req.Headers["Host"];
            var stage = req.RequestContext.Stage;
            var soarS3Base = req.StageVariables["soar_s3_base"];
            var soarPreviewsBucketName = req.StageVariables["soar_previews_bucket_name"];

            var reqDetails = JsonConvert.DeserializeObject<UploadDetailsReq>(req.Body);
            string extension = GetExtensionForContentType(reqDetails.contentType);

            using (var storageService = _storageService == null ? new DynamoDbStorageService() : _storageService)
            {
                var fileName = $"{reqDetails.fileHash}.{extension}";
                var details = new UploadDetailsRes()
                {
                    challenge = Guid.NewGuid().To32CharactesString(),
                    secret = Guid.NewGuid().To32CharactesString(),
                    uploadUrl = $"https://{baseUrl}/{stage}/upload/{fileName}",
                    previewUrl = $"{soarS3Base}/{soarPreviewsBucketName}/{fileName}",
                    downloadUrl = $"https://{baseUrl}/{stage}/download/{fileName}"
                };
                var success = await storageService.PutSecret(details.secret, details.challenge, reqDetails.address, reqDetails.fileHash);
                if (!success)
                    throw new SoarException("Error during storing verification secret in db");
                var res = new APIGatewayProxyResponse()
                {
                    Headers = APIGatewayHelpers.GetResponseHeaders(),
                    Body = JsonConvert.SerializeObject(details),
                    StatusCode = 200
                };
                return res;
            }
        }

        private string GetExtensionForContentType(string contentType)
        {
            switch (contentType)
            {
                case "image/jpeg":
                    return "jpg";
                case "image/jpg":
                    return "jpg";
                default:
                    throw new SoarException("Given content type is not supported");
            }
        }
    }
}
