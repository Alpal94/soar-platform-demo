using System;
using System.Collections.Generic;
using System.Text;

namespace Soar.Core
{
    public class SoarException : Exception
    {
        public SoarException() : base() { }

        public SoarException(string message) : base(message) { }

        public SoarException(string message, Exception innerException) : base(message, innerException) { }
    }
}
