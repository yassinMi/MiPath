
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MiPath.Server.Api;
using MiPath.Server.Application.DependencyInjection;
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Infrastructure;
using MiPath.Server.Infrastructure.Repositories;
using System.Text;
using System.Text.Json.Serialization;

namespace MiPath.Server
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
            builder.Services.AddScoped<IUserRepository, EfUserRepository>();
            builder.Services.AddAuthentication( options =>
            {

                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;


            }).AddGoogle( options =>
            {
                options.ClientId = builder.Configuration["MPGoogle:ClientId"];
                options.ClientSecret = builder.Configuration["MPGoogle:ClientSecret"];

                // These events allow you to intercept the token after Google login
                options.Events.OnCreatingTicket = ctx =>
                {
                    // ctx.Principal contains Google claims
                    // You can generate your own JWT here if you want
                    return Task.CompletedTask;
                };
            })
            
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["MPJwt:Issuer"],
            ValidAudience = builder.Configuration["MPJwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["MPJwt:Key"] ??throw new Exception("MPJwt:Key not set")))
        };
    }).AddCookie(CookieAuthenticationDefaults.AuthenticationScheme);
           
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

            var app = builder.Build();
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.Migrate();
                
                //add initial data for demonstration - ai generated file
                await MiPath.Server.Infrastructure.SeedData.SeedDatabaseAsync(app.Services);
            }

            app.UseAuthentication();
            app.UseAuthorization();
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



            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
