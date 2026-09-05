using GamersCommunity.Core.Rabbit;
using Microsoft.Extensions.Options;
using Serilog;

namespace Template.Consumer;

public class TemplateServiceConsumer(IOptions<RabbitMQSettings> otps, BusRouter router, ILogger logger)
    : BasicServiceConsumer(otps, router, logger)
{
    public override string QUEUE { get; set; } = "template_queue";
}
