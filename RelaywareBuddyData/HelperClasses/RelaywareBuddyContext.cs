
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace RelaywareBuddyData.HelperClasses
{
    public partial class RelaywareBuddyContext : DbContext
    {
        public RelaywareBuddyContext()
            : base("name=RWBuddyDBContext")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public DbSet<Models.Customer> Customer { get; set; }
        public DbSet<Models.Ticket> Ticket { get; set; }
        public DbSet<Models.CustomerAccess> CustomerAccess { get; set; }
        public DbSet<Models.Timer> Timer { get; set; }

    }
}

    
