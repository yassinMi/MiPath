using MiPath.Server.Application.Interfaces;
using MiPath.Server.Domain.ProjectManagement;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Infrastructure.Repositories
{
    public class EfProjectRepository :IProjectRepository
    {
        private readonly AppDbContext _dbContext;

        public EfProjectRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Project?> GetByIdAsync(int id)
        {
            return await  _dbContext.Project.Include(p => p.Client).FirstOrDefaultAsync(p => p.ID == id);
        }

        public async Task DeleteAsync(Project project)
        {
            _dbContext.Project.Remove(project);
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int projectId)
        {
            _dbContext.Project.Remove(new Project() { ID = projectId, Client = null!, Description = null!, Name = null! });
            await _dbContext.SaveChangesAsync();
        }
        public async Task<Project> AddAsync(Project project)
        {
            _dbContext.Project.Add(project);
            await _dbContext.SaveChangesAsync();
            return project;
        }
        public async Task UpdateAsync(Project project)
        {
            _dbContext.Project.Update(project);
            await _dbContext.SaveChangesAsync();
            return;
        }

        public IQueryable<Project> Query()
        {
            return _dbContext.Project.AsQueryable();
        }

        

    }
}
