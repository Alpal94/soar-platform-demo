using System;
using System.Collections.Generic;
using System.Text;

namespace Soar.Core.Helpers
{
    public static class APIGatewayHelpers
    {
        public static Dictionary<string,string> GetResponseHeaders()
        {
            return new Dictionary<string, string>()
            {
                { "Access-Control-Allow-Origin", "*" }
            };
        }
    }
}
