using FreelancerProjectManager.Server.Application.DTO;
using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.TaskManagement.Queries.Dto;
using FreelancerProjectManager.Server.Domain.ProjectManagement;
using Microsoft.EntityFrameworkCore;

namespace FreelancerProjectManager.Server.Application.TaskManagement.Queries
{
    public class GetTasksQueryHandler:IQueryHandler<GetTasksQuery, List<TaskDto>>
    {
        private readonly ITaskRepository _taskRepository;
        public GetTasksQueryHandler(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public async Task<List<TaskDto>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
        {
            if(request.ByProject == null)
            {
                return await _taskRepository.GetAll().Select(t => t.ToDto()).ToListAsync();
            }
            else
            {
                return await _taskRepository.GetAll()

                .Where(t => t.ProjectID == request.ByProject.Value).Select(t => t.ToDto()).ToListAsync();
            }
              

        }

        
    }
}
