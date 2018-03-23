using Nethereum.ABI.FunctionEncoding.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Soar.Core.Ethereum
{
    public class VerificationEvent
    {
        [Parameter("address", "account", 1, false)]
        public string Sender { get; set; }
        [Parameter("bytes32", "challange", 2, true)]
        public byte[] Challange { get; set; }
    }
}
