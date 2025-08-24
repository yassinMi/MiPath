using System.Reflection;

namespace FreelancerProjectManager.Server.Application.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationCommandAndQueryHandlers(this IServiceCollection services)
        {
            services.Scan(scan => scan
                .FromAssemblies(Assembly.GetExecutingAssembly())//application asmbly
                .AddClasses(c => c.AssignableTo(typeof(ICommandHandler<,>)))
                    .AsSelf()
                    .WithTransientLifetime()
                .AddClasses(c => c.AssignableTo(typeof(ICommandHandler<>)))
                    .AsSelf()
                    .WithTransientLifetime()
                .AddClasses(c => c.AssignableTo(typeof(IQueryHandler<,>)))
                    .AsSelf()
                    .WithTransientLifetime()
            );

            return services;
        }
    }
}
