using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using YourProject.Models;  // Ensure this matches your actual project namespace

namespace YourProject.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Transaction> Transactions { get; set; }
    }
}
