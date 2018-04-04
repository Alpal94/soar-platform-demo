using System;
using System.Collections.Generic;
using System.Text;

namespace Soar.Core.Models
{
    public class UploadDetailsRes
    {
        public string challenge { get; set; }
        public string secret { get; set; }
        public string uploadUrl { get; set; }
        public string previewUrl { get; set; }
        public string downloadUrl { get; set; }
    }
}
