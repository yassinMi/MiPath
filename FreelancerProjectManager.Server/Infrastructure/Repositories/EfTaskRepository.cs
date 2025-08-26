
using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Domain.ProjectManagement;

namespace FreelancerProjectManager.Server.Infrastructure.Repositories
{
    public class EfTaskRepository:ITaskRepository
    {
        private readonly AppDbContext _dbContext;

        public EfTaskRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PTask?> GetById(int id)
        {
            return await _dbContext.Tasks.FindAsync(id);
        }

        public async Task Delete(PTask task)
        {
            _dbContext.Tasks.Remove(task);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<PTask> Add(PTask task)
        {
            _dbContext.Tasks.Add(task);
            await _dbContext.SaveChangesAsync();
            return task;
        }

        public async Task Update(PTask task)
        {
            _dbContext.Tasks.Update(task);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<PTask> AddAsync(PTask task)
        {
            _dbContext.Tasks.Add(task);
            await _dbContext.SaveChangesAsync();
            return task;
        }
        public async Task UpdateAsync(PTask task)
        {
            _dbContext.Tasks.Update(task);
            await _dbContext.SaveChangesAsync();
            return;
        }
        public IQueryable<PTask> GetAll()
        {
            return _dbContext.Tasks.AsQueryable();
        }
        public async Task DeleteAsync(int taskId)
        {
            _dbContext.Tasks.Remove(new Domain.ProjectManagement.PTask() { ID = taskId, Description = null!, Title = null! });
            await _dbContext.SaveChangesAsync();
        }



    }
}
