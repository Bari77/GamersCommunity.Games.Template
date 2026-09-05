using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Template.Database.Context;

/// <summary>
/// Factory used by EF Core tools (<c>dotnet ef</c>) at design-time.
/// </summary>
public class TemplateDbContextFactory : IDesignTimeDbContextFactory<TemplateDbContext>
{
    public TemplateDbContext CreateDbContext(string[] args)
    {
        var options = new DbContextOptionsBuilder<TemplateDbContext>()
            .UseSqlServer(
                "Server=127.0.0.1,14333;User Id=sa;Password=Your_password123;Initial Catalog=Template;TrustServerCertificate=True;Encrypt=True;")
            .Options;
        return new TemplateDbContext(options);
    }
}
