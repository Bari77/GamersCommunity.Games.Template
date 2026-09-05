using Microsoft.EntityFrameworkCore;

namespace Template.Database.Context;

/// <summary>
/// Design-time DbContext configuration (<c>dotnet ef</c> tools).
/// At runtime, the connection string is injected via DI in <c>Template.Consumer</c>.
/// </summary>
public partial class TemplateDbContext
{
    public TemplateDbContext()
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(
                "Server=127.0.0.1,14333;User Id=sa;Password=Your_password123;Initial Catalog=Template;TrustServerCertificate=True;Encrypt=True;");
        }
    }
}
