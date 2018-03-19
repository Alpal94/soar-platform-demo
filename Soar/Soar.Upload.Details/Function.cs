using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Soar.Core.Models;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace Soar.Upload.Details
{
    public class Function
    {
        
        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public Task<UploadDetailsRes> FunctionHandler(UploadDetailsReq input, ILambdaContext context)
        {
            var baseUrl = "https://f3cmroo3se.execute-api.ap-southeast-1.amazonaws.com/dev";
            var fileName = $"{input.fileHash}.{input.extension}";
            var res = new UploadDetailsRes()
            {
                challenge = Guid.NewGuid().ToString(),
                secret = Guid.NewGuid().ToString(),
                uploadUrl = $"{baseUrl}/upload/{fileName}",
                previewUrl = "https://s3-ap-southeast-1.amazonaws.com/soar-previews/" + fileName,
                downloadUrl = $"{baseUrl}/download/{fileName}"
            };
            //todo save it in dynamo db to verify when file is uploading, for now there is no check during uploading
            return Task.FromResult(res);
        }
    }
}
