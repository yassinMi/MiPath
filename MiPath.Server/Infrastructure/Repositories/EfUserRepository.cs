using MiPath.Server.Application.Interfaces;
using MiPath.Server.Domain.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Infrastructure.Repositories
{
    public class EfUserRepository :IUserRepository
    {
        private readonly AppDbContext _dbContext;

        public EfUserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await  _dbContext.Users.FirstOrDefaultAsync(p => p.ID == id);
        }

        public async Task DeleteAsync(User user)
        {
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int userId)
        {
            _dbContext.Users.Remove(new User() { ID = userId });
            await _dbContext.SaveChangesAsync();
        }
        public async Task<User> AddAsync(User user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }
        public async Task UpdateAsync(User user)
        {
            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();
            return;
        }

        public IQueryable<User> Query()
        {
            return _dbContext.Users.AsQueryable();
        }

        

    }
}
