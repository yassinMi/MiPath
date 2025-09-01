
using MiPath.Server.Domain.ProjectManagement;

namespace MiPath.Server.Application.Interfaces
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
