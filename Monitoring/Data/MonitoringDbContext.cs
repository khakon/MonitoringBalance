using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Monitoring.Data
{
    public class MonitoringDbContext: DbContext
    {
        public MonitoringDbContext(DbContextOptions<MonitoringDbContext> options)
            : base(options)
        {

        }
        public virtual DbSet<supers> supers { get; set; }
        public virtual DbSet<agents> agents { get; set; }
        public virtual DbSet<kontragents> kontragents { get; set; }
        public virtual DbSet<debts> debts { get; set; }
    }
}
