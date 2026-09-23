using GamersCommunity.Core.Hosting;
using GamersCommunity.Core.Logging;
using GamersCommunity.Core.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Template.Consumer.Configuration;
using Template.Consumer.Integration;
using Template.Consumer.Services.Infra;
using Template.Database.Context;
using Template.Database.Seed;

namespace Template.Consumer;

public class Program
{
    public static Task Main(string[] args) =>
        GamersCommunityConsumerHost.RunAsync<TemplateDbContext, TemplateServiceConsumer>(
            args,
            consoleTitle: "Template MicroService",
            configureLogging: (context, logging) =>
            {
                var loggerSettings = context.Configuration.GetSection("LoggerSettings").Get<LoggerSettings>() ?? new LoggerSettings();
                Logger.Initialize(loggerSettings, "Template MS", context.HostingEnvironment);
                logging.ClearProviders();
                Log.Information("Starting ...");
            },
            configureServices: (context, services) =>
            {
                services.AddOptions<AppSettings>().Bind(context.Configuration.GetSection("AppSettings")).ValidateOnStart();
                // When the game needs Platform mute / Whispers / friends checks:
                // services.AddPlatformRpcClients(); // GamersCommunity.Core.Platform
                // services.AddRealtimeEventPublisher();
                services.Scan(scan => scan
                    .FromAssembliesOf(typeof(AppSettings))
                    .AddClasses(c => c.AssignableTo<IBusService>())
                    .AsImplementedInterfaces()
                    .WithScopedLifetime());
                services.AddScoped<HealthService>();
                services.AddHostedService<PlatformEventsSubscriber>();
            },
            afterMigrate: async (db, sp, _) =>
            {
                var seedLogger = sp.GetRequiredService<ILoggerFactory>().CreateLogger("ReferenceDataSeed");
                await ReferenceDataSeed.EnsureAsync(db, seedLogger);
            });
}
