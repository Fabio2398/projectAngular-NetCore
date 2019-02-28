using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angularAspNet.Models
{
    public class Response
    {
        public Response(CODE code)
        {
            this.Code = code;
        }
        public enum CODE
        {
            OK,
            KO
        }
        public string Message { get; set; }
        public CODE Code { get; set; }
    }
}
