using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Newtonsoft.Json;
using Soar.Core.Services;
using Soar.Core.Ethereum;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace Soar.Authorizer.Ethereum
{
    public class Function
    {
        private readonly IStorageService _storageService;
        private readonly IEthereumService _ethereumService = new EthereumService(); 

        public Function()
        {
            _storageService = new DynamoDbStorageService();
        }

        public Function(IStorageService storageService)
        {
            _storageService = storageService;
        }

        public async Task<APIGatewayCustomAuthorizerResponse> FunctionHandler(APIGatewayCustomAuthorizerRequest authEvent, ILambdaContext context)
        {
            context.Logger.LogLine(JsonConvert.SerializeObject(authEvent));
            string secret = null;
            string transactionHash = null;
            authEvent.Headers.TryGetValue("soar-secret", out secret);
            authEvent.Headers.TryGetValue("soar-transaction-hash", out transactionHash);

            if(string.IsNullOrEmpty(secret) || string.IsNullOrEmpty(transactionHash))
                return GetDenyResponse(authEvent.AuthorizationToken);

            try
            {
                var sdDb = await _storageService.GetSecretDetails(secret);
                var sdEth = await _ethereumService.GetSecretDetails(transactionHash);
                context.Logger.LogLine($"Secret: {secret} address: {sdDb.Address} addressEth: {sdEth.Address} challenge: {sdDb.Challenge} challengeEth: {sdEth.Challenge}");
                if (sdDb.Challenge.Equals(sdEth.Challenge) && sdDb.Address.Equals(sdEth.Address))
                    return GetAllowResponse(authEvent.AuthorizationToken);

                return GetDenyResponse(authEvent.AuthorizationToken);
            }
            finally
            {
                _storageService.Dispose();
            }
        }

        private APIGatewayCustomAuthorizerResponse GetAllowResponse(string principalId)
        {
            var res = new APIGatewayCustomAuthorizerResponse()
            {
                PrincipalID = principalId,
                PolicyDocument = new APIGatewayCustomAuthorizerPolicy()
                {
                    Version = "2012-10-17",
                    Statement = new List<APIGatewayCustomAuthorizerPolicy.IAMPolicyStatement>()
                    {
                        new APIGatewayCustomAuthorizerPolicy.IAMPolicyStatement()
                        {
                            Effect = "Allow",
                            Action = new HashSet<string>() { "execute-api:Invoke" },
                            Resource = new HashSet<string>() { "arn:aws:execute-api:ap-southeast-1:022173912118:f3cmroo3se/*/GET/download/*" }
                        }
                    }
                }
            };
            return res;
        }

        private APIGatewayCustomAuthorizerResponse GetDenyResponse(string principalId)
        {
            var res = new APIGatewayCustomAuthorizerResponse()
            {
                PrincipalID = principalId,
                PolicyDocument = new APIGatewayCustomAuthorizerPolicy()
                {
                    Version = "2012-10-17",
                    Statement = new List<APIGatewayCustomAuthorizerPolicy.IAMPolicyStatement>()
                    {
                        new APIGatewayCustomAuthorizerPolicy.IAMPolicyStatement()
                        {
                            Effect = "Deny",
                            Action = new HashSet<string>() { "execute-api:Invoke" },
                            Resource = new HashSet<string>() { "arn:aws:execute-api:ap-southeast-1:022173912118:f3cmroo3se/*/GET/download/*" }
                        }
                    }
                }
            };
            return res;
        }

    }
}
