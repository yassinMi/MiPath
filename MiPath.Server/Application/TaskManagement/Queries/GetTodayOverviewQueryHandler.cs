using MiPath.Server.Application.DTO;
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.TaskManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Application.TaskManagement.Queries
{
   /// <summary>
   /// ruturn tasks that are due today or planned today
   /// </summary>
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
            if (currentUser.UserId == null) { throw new UnauthorizedAccessException("User not authenticated"); }
            
            var today = DateTime.UtcNow.Date;
            var tasks = _taskRepository.GetAll()
                .Where(t => t.Project!.UserID == currentUser.UserId)
                .Where(t => (t.DueDate.HasValue && t.DueDate.Value.Date == today) || 
                           (t.PlannedStart.HasValue && t.PlannedStart.Value.Date == today));
            
            return await tasks.Select(t => t.ToDto()).ToListAsync();
        }
    }
}
