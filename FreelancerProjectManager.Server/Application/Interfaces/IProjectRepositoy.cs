
using FreelancerProjectManager.Server.Domain.ProjectManagement;

namespace FreelancerProjectManager.Server.Application.Interfaces
{
    public interface IProjectRepository
    {
        IQueryable<Project> Query();
        Task<Project?> GetByIdAsync(int id);
        Task DeleteAsync(int iD);
        Task UpdateAsync(Project project);
        Task<Project> AddAsync(Project p);
    }
}
