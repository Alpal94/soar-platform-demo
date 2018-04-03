using System;
using System.Collections.Generic;
using System.Text;

namespace Soar.Core.Extensions
{
    public static class GuidExtensions
    {
        public static string To32CharactesString(this Guid me)
        {
            return me.ToString("N");
        }
    }
}
