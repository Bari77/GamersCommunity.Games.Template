using GamersCommunity.Core.Database.Seed;
using Microsoft.Extensions.Logging;
using Template.Database.Context;

namespace Template.Database.Seed;

public static class ReferenceDataSeed
{
    private static readonly IReadOnlyList<IReferenceTableSeed<TemplateDbContext>> Tables =
        ReferenceTableSeedDiscovery.Discover<TemplateDbContext>(typeof(ReferenceDataSeed).Assembly);

    public static Task EnsureAsync(
        TemplateDbContext db,
        ILogger logger,
        CancellationToken ct = default) =>
        ReferenceDataSeedRunner.EnsureAsync(db, Tables, logger, ct);
}
