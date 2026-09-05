using Template.Database.Context;
using Template.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Template.Tests;

public static class FakeDataset
{
    public static TemplateDbContext CreateContext(string? name = null)
    {
        var options = new DbContextOptionsBuilder<TemplateDbContext>()
            .UseInMemoryDatabase(name ?? Guid.NewGuid().ToString())
            .Options;
        var ctx = new TemplateDbContext(options);
        ctx.Items.AddRange(
            new Item { Id = 1, Entitled = "DEMO_SWORD", CreationDate = DateTime.UtcNow, ModificationDate = DateTime.UtcNow },
            new Item { Id = 2, Entitled = "DEMO_SHIELD", CreationDate = DateTime.UtcNow, ModificationDate = DateTime.UtcNow }
        );
        ctx.SaveChanges();
        return ctx;
    }
}
