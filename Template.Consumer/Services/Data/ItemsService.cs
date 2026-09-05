using GamersCommunity.Core.Services;
using Template.Database.Context;
using Template.Database.Models;

namespace Template.Consumer.Services.Data;

public class ItemsService(TemplateDbContext context)
    : GenericDataService<TemplateDbContext, Item>(context, "Items")
{
}
