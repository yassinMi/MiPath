using FreelancerProjectManager.Server.Domain.ProjectManagement;
using Microsoft.EntityFrameworkCore;
using System;

namespace FreelancerProjectManager.Server.Infrastructure
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder
                .Properties<Project.ProjectStatus>()
                .HaveConversion<string>()
                .HaveMaxLength(20);
        }
        public DbSet<Project> Project { get; set; }
        public DbSet<PTask> Tasks { get; set; }
        public DbSet<Client> Clients { get; set; }
    }
}
