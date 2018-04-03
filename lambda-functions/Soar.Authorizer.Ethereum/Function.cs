using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Newtonsoft.Json;
using Soar.Core.Services;
using Soar.Core.Extensions;
using Soar.Core.Ethereum;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace Soar.Authorizer.Ethereum
{
    public class Function
    {
        private readonly IStorageService _storageService;
        
        public Function() {}

        public Function(IStorageService storageService)
        {
            _storageService = storageService;
        }

        public async Task<APIGatewayCustomAuthorizerResponse> FunctionHandler(APIGatewayCustomAuthorizerRequest authEvent, ILambdaContext context)
        {
            context.Logger.LogLine(JsonConvert.SerializeObject(authEvent));
            VerificationEventType verificationType;
            if (authEvent.Path.StartsWith("/upload/"))
                verificationType = VerificationEventType.VerificationUpload;
            else if (authEvent.Path.StartsWith("/download/"))
                verificationType = VerificationEventType.VerificationSale;
            else
                return GetDenyResponse(authEvent.AuthorizationToken);

            string secret = null;
            string txnHash = null;
            authEvent.QueryStringParameters.TryGetValue("soarSecret", out secret);
            authEvent.QueryStringParameters.TryGetValue("txnHash", out txnHash);

            if(string.IsNullOrEmpty(secret) || string.IsNullOrEmpty(txnHash))
                return GetDenyResponse(authEvent.AuthorizationToken);

            string infuraAddress = authEvent.StageVariables["infura_address"];
            string soarContractAddress = authEvent.StageVariables["soar_contract_address"];
            IEthereumService ethereumService = new EthereumService(infuraAddress, soarContractAddress);
            using (var storageService = _storageService == null ? new DynamoDbStorageService(context.Logger.LogLine) : _storageService)
            {
                var sdDb = await storageService.GetSecretDetails(secret);
                var sdEth = await ethereumService.GetSecretDetails(txnHash, verificationType);
                if(sdDb == null || sdEth == null)
                    return GetDenyResponse(authEvent.AuthorizationToken);

                context.Logger.LogLine($"secret: {secret}");
                context.Logger.LogLine($"address: {sdDb.Address} addressEth: {sdEth.Address}");
                context.Logger.LogLine($"challenge: {sdDb.Challenge} challengeEth: {sdEth.Challenge}");
                context.Logger.LogLine($"fileHash: {sdDb.FileHash} fileHashEth: {sdEth.FileHash}");
                if (sdDb.Challenge.Equals(sdEth.Challenge) && sdDb.Address.EqualsIgnoreCase(sdEth.Address) && sdDb.FileHash.Equals(sdEth.FileHash))
                {
                    context.Logger.LogLine("Success");
                    //todo mark secret as used one in db to disable to use it again
                    return GetAllowResponse(authEvent.AuthorizationToken);
                }
                return GetDenyResponse(authEvent.AuthorizationToken);
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
                            Resource = new HashSet<string>() {
                                "arn:aws:execute-api:ap-southeast-1:022173912118:f3cmroo3se/*/GET/download/*",
                                "arn:aws:execute-api:ap-southeast-1:022173912118:f3cmroo3se/*/POST/upload/*"
                            }
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
