
using FreelancerProjectManager.Server.Api;
using FreelancerProjectManager.Server.Application.DependencyInjection;
using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Infrastructure;
using FreelancerProjectManager.Server.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Text.Json.Serialization;

namespace FreelancerProjectManager.Server
{
    public class Program
    {
        public async static Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            
var connectionString = builder.Configuration.GetConnectionString("FpmDBConnectionString");


            // Add services to the container.
            //todo: provide con string in envirement variable instead
            builder.Services.AddDbContext<AppDbContext>(options =>
        { options.UseNpgsql(connectionString,npgsqlOptions =>
        {
            npgsqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 10,
                        maxRetryDelay: TimeSpan.FromSeconds(5),
                        errorCodesToAdd: null
                    );
        });
        });
            builder.Services.AddEndpointsApiExplorer();


            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
            builder.Services.AddSwaggerGen(c =>
            {
                c.SchemaFilter<TaskFieldsSchemaFilter>();
            });
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();
            builder.Services.AddApplicationCommandAndQueryHandlers();
            builder.Services.AddScoped<ITaskRepository, EfTaskRepository>();
            builder.Services.AddScoped<IProjectRepository, EfProjectRepository>();
            builder.Services.AddScoped<IClientRepository, EfClientRepository>();
            var app = builder.Build();
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.Migrate();
                
                //add initial data for demonstration - ai generated file
                await FreelancerProjectManager.Server.Infrastructure.SeedData.SeedDatabaseAsync(app.Services);
            }
            app.UseDefaultFiles();
            app.MapStaticAssets();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.UseSwagger();
                app.UseSwaggerUI();
            }      

               //app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
