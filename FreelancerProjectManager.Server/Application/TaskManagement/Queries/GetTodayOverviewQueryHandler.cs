using FreelancerProjectManager.Server.Application.DTO;
using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.TaskManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace FreelancerProjectManager.Server.Application.TaskManagement.Queries
{
   
    public class GetTodayOverviewQueryHandler:IQueryHandler<GetTodayOverviewQuery, List<TaskDto>>
    {
        private readonly ITaskRepository _taskRepository;
        public GetTodayOverviewQueryHandler(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public async Task<List<TaskDto>> Handle(GetTodayOverviewQuery request, CancellationToken cancellationToken)
        {
            var tasks = _taskRepository.GetAll();
            return await tasks.Select(t => t.ToDto()).ToListAsync();
        }
    }
}
