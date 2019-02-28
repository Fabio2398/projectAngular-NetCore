using angularAspNet.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angularAspNet.Context
{
    public class EroiContext : DbContext
    {
        public DbSet<Eroi> Eroi { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=tcp:gctest1.database.windows.net,1433;Initial Catalog=test_symmetricds;Persist Security Info=False;User ID=Uadmin;Password=UA4m1n$18;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
    }
}
