using Microsoft.EntityFrameworkCore;

namespace MetaData.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Link> Links { get; set; }
    }
}