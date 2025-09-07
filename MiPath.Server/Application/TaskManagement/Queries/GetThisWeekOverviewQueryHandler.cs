using MiPath.Server.Application.DTO;
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.TaskManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Application.TaskManagement.Queries
{
    
    /// <summary>
    /// todo; instead of list of dto, return a projection that is optimized for the thisWeek dashboard
    /// </summary>
    public class GetThisWeekOverviewQueryHandler: IQueryHandler<GetThisWeekOverviewQuery, List<TaskDto>>
    {
        private readonly ITaskRepository _taskRepository;
        private readonly ICurrentUserService currentUser;

        public GetThisWeekOverviewQueryHandler(ITaskRepository taskRepository, ICurrentUserService currentUser)
        {
            _taskRepository = taskRepository;
            this.currentUser = currentUser;
        }
        public async Task<List<TaskDto>> Handle(GetThisWeekOverviewQuery request, CancellationToken cancellationToken)
        {
            if (currentUser.UserId == null) { throw new UnauthorizedAccessException("User not authenticated"); }


           
           var tasks = _taskRepository.GetAll()
    .Where(t => t.Project!.UserID == currentUser.UserId)
    .Where(t =>
        (t.PlannedStart.HasValue &&
         t.PlannedStart.Value >= request.WeekStart &&
         t.PlannedStart.Value < request.WeekEnd)
    );
            
            return await tasks.Select(t => t.ToDto()).ToListAsync();
        }
    }
    
    
}
