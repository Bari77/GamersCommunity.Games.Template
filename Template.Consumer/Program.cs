using GamersCommunity.Core.Logging;
using GamersCommunity.Core.Rabbit;
using GamersCommunity.Core.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Template.Consumer.Configuration;
using Template.Consumer.Services.Infra;
using Template.Database.Context;

namespace Template.Consumer;

public class Program
{
    public static async Task Main(string[] args)
    {
        Console.Title = "Template MicroService";
        try
        {
            var builder = Host.CreateDefaultBuilder(args)
                .ConfigureLogging((context, logging) =>
                {
                    var loggerSettings = context.Configuration.GetSection("LoggerSettings").Get<LoggerSettings>() ?? new LoggerSettings();
                    Logger.Initialize(loggerSettings, "Template MS", context.HostingEnvironment);
                    logging.ClearProviders();
                    Log.Information("Starting ...");
                })
                .ConfigureServices((context, services) =>
                {
                    services.AddOptions<RabbitMQSettings>().Bind(context.Configuration.GetSection("RabbitMQ")).ValidateOnStart();
                    services.AddOptions<AppSettings>().Bind(context.Configuration.GetSection("AppSettings")).ValidateOnStart();
                    services.AddDbContext<TemplateDbContext>((sp, options) =>
                    {
                        var connectionString = context.Configuration.GetConnectionString("Database")
                            ?? throw new InvalidOperationException("Connection string 'Database' is missing.");
                        options.UseSqlServer(connectionString);
                    });
                    services.AddSingleton<Serilog.ILogger>(sp => Log.Logger);
                    services.Scan(scan => scan
                        .FromAssembliesOf(typeof(AppSettings))
                        .AddClasses(c => c.AssignableTo<IBusService>())
                        .AsImplementedInterfaces()
                        .WithScopedLifetime());
                    services.AddScoped<HealthService>();
                    services.AddScoped<BusRouter>();
                    services.AddScoped<TemplateServiceConsumer>();
                    services.AddHostedService<ConsumerWorker>();
                });

            var host = builder.Build();
            await ApplyDatabaseMigrationsAsync(host.Services);
            var environment = host.Services.GetRequiredService<IHostEnvironment>();
            Log.Information("Started in {Environment} environment...", environment.EnvironmentName);
            await host.RunAsync();
        }
        catch (HostAbortedException ex) { Log.Fatal(ex, "Aborted."); }
        catch (Exception ex) { Log.Fatal(ex, "Terminated unexpectedly."); }
        finally { Log.Information("Stopped ..."); }
    }

    private static async Task ApplyDatabaseMigrationsAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<TemplateDbContext>();
        await dbContext.Database.MigrateAsync();
        Log.Information("Database migrations applied.");
    }
}
