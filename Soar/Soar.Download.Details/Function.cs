using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Soar.Core.Models;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace Soar.Download.Details
{
    public class Function
    {
        
        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public Task<DownloadDetailsRes> FunctionHandler(DownloadDetailsReq req, ILambdaContext context)
        {
            var res = new DownloadDetailsRes()
            {
                challenge = Guid.NewGuid().ToString(),
                secret = Guid.NewGuid().ToString(),
            };
            //todo save it in dynamo db to verify when file is uploading, for now there is no check during downloading
            return Task.FromResult(res);
        }
    }
}
