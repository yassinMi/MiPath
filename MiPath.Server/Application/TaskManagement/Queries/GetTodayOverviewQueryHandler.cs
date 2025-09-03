using MiPath.Server.Application.DTO;
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.TaskManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Application.TaskManagement.Queries
{
   
    public class GetTodayOverviewQueryHandler:IQueryHandler<GetTodayOverviewQuery, List<TaskDto>>
    {
        private readonly ITaskRepository _taskRepository;
        private readonly ICurrentUserService currentUser;

        public GetTodayOverviewQueryHandler(ITaskRepository taskRepository, ICurrentUserService currentUser)
        {
            _taskRepository = taskRepository;
            this.currentUser = currentUser;
        }
        public async Task<List<TaskDto>> Handle(GetTodayOverviewQuery request, CancellationToken cancellationToken)
        {
            var tasks = _taskRepository.GetAll().Where(t=>t.Project.UserID== currentUser.UserId);
            return await tasks.Select(t => t.ToDto()).ToListAsync();
        }
    }
}
