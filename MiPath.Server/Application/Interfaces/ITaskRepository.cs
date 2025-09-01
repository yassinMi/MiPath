using MiPath.Server.Domain.ProjectManagement;

namespace MiPath.Server.Application.Interfaces
{
    public interface ITaskRepository
    {
        Task<PTask?> GetById(int id);
        Task<PTask> Add(PTask task);
        Task Delete(PTask task); 
        Task Update(PTask task);
        IQueryable<PTask> GetAll();
        Task DeleteAsync(int iD);
        Task<PTask> AddAsync(PTask t);
        Task UpdateAsync(PTask task);
    }
}
