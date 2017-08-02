using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Monitoring.Data
{
    public class debts
    {
        public int id { get; set; }
        public Nullable<System.DateTime> period { get; set; }
        public string super { get; set; }
        public string agent { get; set; }
        public string customer { get; set; }
        public Nullable<decimal> bal { get; set; }
        public Nullable<decimal> debt { get; set; }
        public Nullable<decimal> shippment { get; set; }
        public Nullable<decimal> payment { get; set; }
        [ForeignKey("super")]
        public virtual supers supers { get; set; }
        [ForeignKey("agent")]
        public virtual agents agents { get; set; }
        [ForeignKey("customer")]
        public virtual kontragents kontragents { get; set; }
    }
}
