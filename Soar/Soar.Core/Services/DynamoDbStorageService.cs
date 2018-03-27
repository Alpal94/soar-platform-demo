using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Soar.Core.Models;
using Newtonsoft.Json;

namespace Soar.Core.Services
{
    public class DynamoDbStorageService : IStorageService
    {
        private readonly AmazonDynamoDBClient _client;
        private readonly Action<string> _logLine;

        private static string tableName = "SoarVerification";
        private static string columnSecret = "secret";
        private static string columnChallenge = "challenge";
        private static string columnAddress = "address";
        private static string columnFileHash = "fileHash";

        public DynamoDbStorageService(Action<string> logLine = null)
        {
            _client = new AmazonDynamoDBClient(RegionEndpoint.APSoutheast1);
            _logLine = logLine;
        }

        public DynamoDbStorageService(AmazonDynamoDBClient client)
        {
            _client = client;
        }

        public async Task<bool> PutSecret(string secret, string challenge, string address, string fileHash)
        {
            var request = new PutItemRequest
            {
                TableName = tableName,
                Item = new Dictionary<string, AttributeValue>()
                    {
                        { columnSecret, new AttributeValue { S = secret } },
                        { columnChallenge, new AttributeValue { S = challenge } },
                        { columnAddress, new AttributeValue { S = address } },
                        { columnFileHash, new AttributeValue { S = fileHash } }
                    }
            };
            PutItemResponse dynamoDbResponse = await _client.PutItemAsync(request);
            return dynamoDbResponse.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }

        public async Task<SecretDetails> GetSecretDetails(string secret)
        {
            var request = new QueryRequest
            {
                TableName = tableName,
                KeyConditionExpression = string.Format("{0} = :v_Secret", columnSecret),
                ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
                        {":v_Secret", new AttributeValue { S =  secret }}
                    },
                ProjectionExpression = string.Format("{0}, {1}, {2}", columnAddress, columnChallenge, columnFileHash),
                ConsistentRead = true
            };
            var response = await _client.QueryAsync(request);
            if (response.Count == 0)
                return null;
            var item = response.Items.First();
            AttributeValue attrAddress = null;
            item.TryGetValue(columnAddress, out attrAddress);
            var address = attrAddress.S;
            AttributeValue attrChallenge = null;
            item.TryGetValue(columnChallenge, out attrChallenge);
            var challenge = attrChallenge.S;
            AttributeValue attrFileHash = null;
            item.TryGetValue(columnFileHash, out attrFileHash);
            var fileHash = attrFileHash.S;

            var res = new SecretDetails()
            {
                Address = address,
                Challenge = challenge,
                FileHash = fileHash
            };
            return res;
        }

        public void Dispose()
        {
            _client.Dispose();
        }
    }
}
