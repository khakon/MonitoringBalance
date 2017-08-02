using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Monitoring.Data
{
    public class kontragents
    {
        public kontragents()
        {
            this.debts = new HashSet<debts>();
        }
        [Key]
        public string code { get; set; }
        public string descr { get; set; }

        public virtual ICollection<debts> debts { get; set; }
    }
}
