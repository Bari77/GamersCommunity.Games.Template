using Microsoft.EntityFrameworkCore;
using Template.Database.Context;
using Template.Database.Models;

namespace Template.Database.Seed;

public sealed class ItemsSeed : KeyTableSeed<TemplateDbContext, Item>
{
    protected override string TableName => nameof(TemplateDbContext.Items);

    protected override DbSet<Item> GetSet(TemplateDbContext db) => db.Items;

    protected override IReadOnlyList<Item> Rows { get; } =
    [
        new() { Id = 1, Entitled = "DEMO_SWORD", CreationDate = SeedDates.Utc, ModificationDate = SeedDates.Utc },
        new() { Id = 2, Entitled = "DEMO_SHIELD", CreationDate = SeedDates.Utc, ModificationDate = SeedDates.Utc },
        new() { Id = 3, Entitled = "DEMO_POTION", CreationDate = SeedDates.Utc, ModificationDate = SeedDates.Utc },
    ];
}
