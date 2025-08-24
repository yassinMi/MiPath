using FreelancerProjectManager.Server.Domain.ProjectManagement;

namespace FreelancerProjectManager.Server.Application.Interfaces
{
    public interface IClientRepository
    {
        Task<Client?> GetById(int id);
        Task<Client> Add(Client task);
        Task Delete(Client task); 
        Task Update(Client task);
        IQueryable<Client> GetAll();
        Task DeleteAsync(int iD);
    }
}
