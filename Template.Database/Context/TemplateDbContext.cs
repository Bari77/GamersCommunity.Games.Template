using Template.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Template.Database.Context;

public partial class TemplateDbContext : DbContext
{
    public TemplateDbContext(DbContextOptions<TemplateDbContext> options) : base(options)
    {
    }

    public virtual DbSet<Item> Items { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Item>(entity =>
        {
            entity.ToTable("Items");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Entitled).HasMaxLength(200).IsRequired();
        });
    }
}
