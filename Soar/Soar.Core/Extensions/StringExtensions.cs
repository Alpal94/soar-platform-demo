using System;
using System.Collections.Generic;
using System.Text;

namespace Soar.Core.Extensions
{
    public static class StringExtensions
    {
        public static bool EqualsIgnoreCase(this string me, string value)
        {
            return me.Equals(value, StringComparison.InvariantCultureIgnoreCase);
        }
    }
}
