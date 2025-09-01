using MiPath.Server.Domain.ProjectManagement;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;

namespace MiPath.Server.Api
{
    public class TaskFieldsSchemaFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            if (context.Type == typeof(string) && context.ParameterInfo?.Name == "orderBy"

                )
            {
                schema.Enum = typeof(PTask).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                    .Select(f => new OpenApiString(f.Name) as IOpenApiAny).ToList();//todo: improve this code to avoie unexpected properties
            }
        }
    }
}
