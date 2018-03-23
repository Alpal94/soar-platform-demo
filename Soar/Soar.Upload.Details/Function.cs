using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Soar.Core.Models;
using Soar.Core.Extensions;
using Soar.Core.Services;
using Soar.Core;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace Soar.Upload.Details
{
    public class Function
    {
        private readonly IStorageService _storageService;

        //todo refactor these constants into the enviroment variable
        private readonly string BASE_URL = "https://f3cmroo3se.execute-api.ap-southeast-1.amazonaws.com/dev";
        private readonly string SOAR_PREVIEWS_S3_BUCKET = "https://s3-ap-southeast-1.amazonaws.com/soar-previews/";


        public Function()
        {
            _storageService = new DynamoDbStorageService();
        }

        public Function(IStorageService storageService)
        {
            _storageService = storageService;
        }

        public async Task<UploadDetailsRes> FunctionHandler(UploadDetailsReq req, ILambdaContext context)
        {
            var fileName = $"{req.fileHash}.{req.extension}";
            var res = new UploadDetailsRes()
            {
                challenge = Guid.NewGuid().To32CharactesString(),
                secret = Guid.NewGuid().To32CharactesString(),
                uploadUrl = $"{BASE_URL}/upload/{fileName}",
                previewUrl = $"{SOAR_PREVIEWS_S3_BUCKET}{fileName}",
                downloadUrl = $"{BASE_URL}/download/{fileName}"
            };
            var success = await _storageService.PutSecret(res.secret, res.challenge, req.address);
            if (!success)
                throw new SoarException("Error during storing verification secret in db");
            return res;
        }
    }
}
