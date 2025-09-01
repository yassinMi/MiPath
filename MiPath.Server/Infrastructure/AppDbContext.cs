using MiPath.Server.Domain.ProjectManagement;
using Microsoft.EntityFrameworkCore;
using System;

namespace MiPath.Server.Infrastructure
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder
                .Properties<ProjectStatus>()
                .HaveConversion<string>()
                .HaveMaxLength(20);
            configurationBuilder
                .Properties<PTaskStatus>()
                .HaveConversion<string>()
                .HaveMaxLength(20);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //we handle this in the create command instead
            //modelBuilder.Entity<PTask>()
            //    .Property(u => u.CreatedAt)
            //    .HasDefaultValueSql("NOW() AT TIME ZONE 'UTC'")
            //    .ValueGeneratedOnAdd();
        }
        public DbSet<Project> Project { get; set; }
        public DbSet<PTask> Tasks { get; set; }
        public DbSet<Client> Clients { get; set; }
    }
}
