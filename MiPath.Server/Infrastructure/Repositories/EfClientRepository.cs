
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Domain.ProjectManagement;

namespace MiPath.Server.Infrastructure.Repositories
{
    public class EfClientRepository:IClientRepository
    {
        private readonly AppDbContext _dbContext;

        public EfClientRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Client?> GetById(int id)
        {
            return await _dbContext.Clients.FindAsync(id);
        }

        public async Task Delete(Client client)
        {
            _dbContext.Clients.Remove(client);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<Client> Add(Client client)
        {
            _dbContext.Clients.Add(client);
            await _dbContext.SaveChangesAsync();
            return client;
        }

        public async Task Update(Client client)
        {
            _dbContext.Clients.Update(client);
            await _dbContext.SaveChangesAsync();
        }

        public IQueryable<Client> GetAll()
        {
            return _dbContext.Clients.AsQueryable();
        }
        public async Task DeleteAsync(int clientId)
        {
            _dbContext.Clients.Remove(new Domain.ProjectManagement.Client() { ID = clientId, Name=null! });
            await _dbContext.SaveChangesAsync();
        }



    }
}
