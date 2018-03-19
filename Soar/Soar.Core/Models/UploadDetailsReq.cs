using System;
using System.Collections.Generic;
using System.Text;

namespace Soar.Core.Models
{
    public class UploadDetailsReq
    {
        public string fileHash { get; set; }
        public string address { get; set; }
        public string extension { get; set; }
    }
}
