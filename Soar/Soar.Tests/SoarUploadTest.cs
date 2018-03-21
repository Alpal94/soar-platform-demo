﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Xunit;
using Amazon.Lambda.TestUtilities;
using Soar.Upload;

namespace Soar.Tests
{
    public class SoarUploadTest
    {
        [Fact]
        public void TestSoarUpload()
        {
            // Invoke the lambda function and confirm the string was upper cased.
            var function = new Function();
            var context = new TestLambdaContext();
            var upperCase = function.FunctionHandler("eth-address", context);
        }
    }
}