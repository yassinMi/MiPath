// AI-Generated Mock Data for Database Seeding
// This file contains realistic sample data to demonstrate the application's capabilities

using FreelancerProjectManager.Server.Application;
using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.PorojectManagement.Commands;
using FreelancerProjectManager.Server.Application.TaskManagement.Commands;
using FreelancerProjectManager.Server.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace FreelancerProjectManager.Server.Infrastructure
{
    public static class SeedData
    {
        public static async Task SeedDatabaseAsync(IServiceProvider serviceProvider)
        {
            ILogger logger = null!;
            try
            {
                using var scope = serviceProvider.CreateScope();
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                logger = scope.ServiceProvider.GetRequiredService<ILogger<AppDbContext>>();

                // Check if database already has data
                if (await dbContext.Clients.AnyAsync() ||
                    await dbContext.Project.AnyAsync() ||
                    await dbContext.Tasks.AnyAsync())
                {
                    logger.LogInformation("Database already contains data. Skipping seed operation.");
                    return;
                }

                logger.LogInformation("Starting database seeding...");

                try
                {
                    await SeedClientsAndProjectsAsync(scope);
                    await SeedTasksAsync(scope);

                    logger.LogInformation("Database seeding completed successfully.");
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Error occurred during database seeding.");
                    throw;
                }
            }
            catch (Exception err)
            {
                    try
                    {
                        logger.LogError("seeding db failed: "+err);

                    }
                    catch (Exception)
                    {

                    }
            }
            
        }

        private static async Task SeedClientsAndProjectsAsync(IServiceScope scope)
        {
            var projectCommandHandler = scope.ServiceProvider.GetRequiredService<CreateProjectCommandHandler>();

                         // Create projects with clients - varied names, descriptions, and statuses
             var projectCommands = new[]
             {
                 // Short name, detailed description
                 new CreateProjectCommand
                 {
                     Name = "E-commerce Redesign",
                     Description = "Complete redesign and modernization of an existing e-commerce platform with improved UX, mobile responsiveness, and performance optimization. Includes integration with payment gateways and inventory management system.",
                     NewClientName = "TechCorp Solutions",
                     Status = CreateProjectCommand.ProjectCreationStatus.Active
                 },
                 
                 // Long name, short description
                 new CreateProjectCommand
                 {
                     Name = "Cross-Platform Fitness Tracking Mobile Application with GPS Integration",
                     Description = "Mobile app for fitness tracking with GPS and social features.",
                     NewClientName = "FitLife Innovations",
                     Status = CreateProjectCommand.ProjectCreationStatus.Active
                 },
                 
                 // Medium name, medium description
                 new CreateProjectCommand
                 {
                     Name = "Corporate Website & CMS",
                     Description = "Professional corporate website with custom content management system, SEO optimization, and analytics integration.",
                     NewClientName = "Global Enterprises Ltd",
                     Status = CreateProjectCommand.ProjectCreationStatus.Scoping
                 },
                 
                 // Very short name, very long description
                 new CreateProjectCommand
                 {
                     Name = "API Dev",
                     Description = "Design and implementation of a comprehensive RESTful API for a SaaS platform. Includes authentication, rate limiting, documentation, comprehensive testing suite, performance monitoring, logging, metrics collection, health checks, circuit breaker pattern implementation, caching strategies, and deployment automation with CI/CD pipeline integration.",
                     NewClientName = "CloudTech Solutions",
                     Status = CreateProjectCommand.ProjectCreationStatus.Active
                 },
                 
                 // Medium name, short description
                 new CreateProjectCommand
                 {
                     Name = "BI Dashboard",
                     Description = "Interactive dashboard for business intelligence and data visualization.",
                     NewClientName = "DataInsight Corp",
                     Status = CreateProjectCommand.ProjectCreationStatus.Scoping
                 },
                 
                 // Long name, medium description
                 new CreateProjectCommand
                 {
                     Name = "Legacy COBOL System Migration to Modern .NET Architecture",
                     Description = "Migration of legacy COBOL system to modern .NET architecture. Includes data migration, business logic preservation, and user training.",
                     NewClientName = "Heritage Financial",
                     Status = CreateProjectCommand.ProjectCreationStatus.Active
                 }
             };

            var projectIds = new List<int>();
            foreach (var command in projectCommands)
            {
                var projectId = await projectCommandHandler.Handle(command, CancellationToken.None);
                projectIds.Add(projectId);
            }
        }

        private static async Task SeedTasksAsync(IServiceScope scope)
        {
            var taskCommandHandler = scope.ServiceProvider.GetRequiredService<CreateTaskCommandHandler>();
            var projectRepository = scope.ServiceProvider.GetRequiredService<IProjectRepository>();
            var projects = await projectRepository.Query().ToListAsync();

            foreach (var project in projects)
            {
                var tasks = GetTasksForProject(project.Name);
                foreach (var task in tasks)
                {
                    task.ProjectID = project.ID;
                    await taskCommandHandler.Handle(task, CancellationToken.None);
                }
            }
        }

                 private static List<CreateTaskCommand> GetTasksForProject(string projectName)
         {
             return projectName switch
             {
                 "E-commerce Redesign" => new List<CreateTaskCommand>
                 {
                     new() { Title = "UI/UX Research", Description = "User research and wireframes", EstimateMinute = 480 },
                     new() { Title = "Frontend Dev", Description = "React.js with TypeScript implementation", EstimateMinute = 1200 },
                     new() { Title = "Backend APIs", Description = "RESTful APIs for products, users, orders", EstimateMinute = 960 },
                     new() { Title = "Database Design", Description = "Optimized schema for products, users, orders, inventory", EstimateMinute = 360 },
                     new() { Title = "Payment Integration", Description = "Stripe and PayPal integration with error handling", EstimateMinute = 600 }
                 },
                 
                 "Cross-Platform Fitness Tracking Mobile Application with GPS Integration" => new List<CreateTaskCommand>
                 {
                     new() { Title = "Architecture Design", Description = "Overall architecture and technology selection for cross-platform development", EstimateMinute = 300 },
                     new() { Title = "UI/UX Design", Description = "Intuitive and engaging user interface designs for fitness tracking features", EstimateMinute = 600 },
                     new() { Title = "Core Features", Description = "Workout tracking, GPS integration, user profile management", EstimateMinute = 900 },
                     new() { Title = "Backend Development", Description = "Cloud backend for user data synchronization and social features", EstimateMinute = 720 },
                     new() { Title = "Testing", Description = "Test on various devices and platforms", EstimateMinute = 540 },
                     new() { Title = "App Store Submission", Description = "Submit to Apple App Store and Google Play Store", EstimateMinute = 240 },
                     new() { Title = "Performance Optimization", Description = "Optimize app performance and battery usage", EstimateMinute = 420 }
                 },
                 
                 "Corporate Website & CMS" => new List<CreateTaskCommand>
                 {
                     new() { Title = "Requirements", Description = "Meet stakeholders, understand business needs", EstimateMinute = 180 },
                     new() { Title = "Information Architecture", Description = "Site structure and navigation design", EstimateMinute = 240 },
                     new() { Title = "Design System", Description = "Typography, colors, component library", EstimateMinute = 360 }
                 },
                 
                 "API Dev" => new List<CreateTaskCommand>
                 {
                     new() { Title = "API Design", Description = "Endpoints, data models, OpenAPI documentation", EstimateMinute = 360 },
                     new() { Title = "Authentication", Description = "JWT-based auth with role-based authorization", EstimateMinute = 480 },
                     new() { Title = "Core Endpoints", Description = "Main API endpoints with error handling", EstimateMinute = 720 },
                     new() { Title = "Security", Description = "Rate limiting, input validation, security measures", EstimateMinute = 300 },
                     new() { Title = "Testing", Description = "Unit tests, integration tests, API testing", EstimateMinute = 540 },
                     new() { Title = "Performance", Description = "Caching, query optimization, load testing", EstimateMinute = 420 },
                     new() { Title = "Monitoring", Description = "Health checks, logging, metrics collection", EstimateMinute = 300 },
                     new() { Title = "Deployment", Description = "CI/CD pipeline automation", EstimateMinute = 240 }
                 },
                 
                 "BI Dashboard" => new List<CreateTaskCommand>
                 {
                     // This project has zero tasks - showing diversity
                 },
                 
                 "Legacy COBOL System Migration to Modern .NET Architecture" => new List<CreateTaskCommand>
                 {
                     new() { Title = "System Analysis", Description = "Analyze existing COBOL system to understand business logic and data structures", EstimateMinute = 600 },
                     new() { Title = "Migration Planning", Description = "Develop comprehensive migration strategy with risk assessment and rollback plans", EstimateMinute = 360 },
                     new() { Title = "Data Migration", Description = "Build tools and scripts for migrating data from legacy system to new architecture", EstimateMinute = 720 },
                     new() { Title = "Business Logic Recreation", Description = "Recreate business logic in modern .NET architecture while maintaining functionality", EstimateMinute = 1200 },
                     new() { Title = "Integration Testing", Description = "Perform extensive testing to ensure data integrity and business logic accuracy", EstimateMinute = 600 },
                     new() { Title = "User Training", Description = "Train users on new system and manage the transition to production", EstimateMinute = 480 },
                     new() { Title = "Go-Live Support", Description = "Provide support during initial production deployment", EstimateMinute = 360 },
                     new() { Title = "Post-Migration Review", Description = "Conduct post-migration review and optimization", EstimateMinute = 240 }
                 },
                 
                 _ => new List<CreateTaskCommand>()
             };
         }
    }
}
