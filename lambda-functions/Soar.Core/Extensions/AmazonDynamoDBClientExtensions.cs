using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Soar.Core.Extensions
{
    public static class AmazonDynamoDBClientExtensions
    {
        private static string tableName = "SoarVerification";
        private static string columnSecret = "secret";
        private static string columnChallenge = "challenge";
        private static string columnAddress = "address";

        public static async Task<bool> InsertSecretChallange(this AmazonDynamoDBClient client, string secret, string challenge, string address)
        {
            var request = new PutItemRequest
            {
                TableName = tableName,
                Item = new Dictionary<string, AttributeValue>()
                    {
                        { columnSecret, new AttributeValue { S = secret } },
                        { columnChallenge, new AttributeValue { S = challenge } },
                        { columnAddress, new AttributeValue { S = address } }
                    }
            };
            PutItemResponse dynamoDbResponse = await client.PutItemAsync(request);
            return dynamoDbResponse.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }
    }
}
