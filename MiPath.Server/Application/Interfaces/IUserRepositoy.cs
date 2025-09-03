
using MiPath.Server.Domain.UserManagement;

namespace MiPath.Server.Application.Interfaces
{
    public interface IUserRepository
    {
        IQueryable<User> Query();
        Task<User?> GetByIdAsync(int id);
        Task DeleteAsync(int iD);
        Task UpdateAsync(User project);
        Task<User> AddAsync(User p);
    }
}
