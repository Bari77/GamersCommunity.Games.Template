using GamersCommunity.Core.Services;
using Template.Database.Context;

namespace Template.Consumer.Services.Infra;

public class HealthService(TemplateDbContext context) : HealthService<TemplateDbContext>(context)
{
}
