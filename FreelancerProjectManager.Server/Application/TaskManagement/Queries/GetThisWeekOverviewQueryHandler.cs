using FreelancerProjectManager.Server.Application.DTO;
using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.TaskManagement.Queries.Dto;
using System.Reflection.Metadata.Ecma335;

namespace FreelancerProjectManager.Server.Application.TaskManagement.Queries
{
    
    /// <summary>
    /// todo; instead of list of dto, return a projection that is optimized for the thisWeek dashboard
    /// </summary>
    public class GetThisWeekOverviewQueryHandler: IQueryHandler<GetThisWeekOverviewQuery, List<TaskDto>>
    {
        private readonly ITaskRepository _taskRepository;
        public GetThisWeekOverviewQueryHandler(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public async Task<List<TaskDto>> Handle(GetThisWeekOverviewQuery request, CancellationToken cancellationToken)
        {
            var tasks = _taskRepository.GetAll();
            return tasks.Select(t => t.ToDto()).ToList();
        }
    }
    
    
}
