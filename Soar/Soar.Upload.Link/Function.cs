using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Soar.Core.Responses;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace Soar.Upload.Link
{
    public class Function
    {
        
        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public Task<UploadLink> FunctionHandler(string address, ILambdaContext context)
        {
            var res = new UploadLink()
            {
                Challenge = Guid.NewGuid().ToString(),
                Secret = Guid.NewGuid().ToString()
            };
            return Task.FromResult(res);
        }
    }
}
