using MiPath.Server.Application.DTO;
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.PorojectManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Application.PorojectManagement.Queries
{
    public class GetProjectsQueryHandler:IQueryHandler<GetProjectsQuery, List<ProjectDto>>
    {
        private readonly IProjectRepository projectRepository;
        private readonly ICurrentUserService currentUser;

        public GetProjectsQueryHandler(IProjectRepository projectRepository, ICurrentUserService currentUser)
        {
            this.projectRepository = projectRepository;
            this.currentUser = currentUser;
        }
        public async Task<List<ProjectDto>> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
        {

            if (currentUser.UserId == null) throw new InvalidOperationException("no user");

            return await projectRepository.Query().Where(p=>p.UserID== currentUser.UserId). Include(p => p.Client)
                .Select(p => new ProjectDto()
                {
                    ID = p.ID,
                    Name = p.Name,
                    Description = p.Description,
                    ClientID = p.ClientID,
                    Client = p.Client.ToDto(),
                    Status = p.Status,
                    TaskCount = p.Tasks!.Count,
                    CompletedTasksCount= p.Tasks.Count(t=>t.Status== Domain.ProjectManagement.PTaskStatus.Done),
                    PlannedTasksCount = p.Tasks.Count(t=> t.Status== Domain.ProjectManagement.PTaskStatus.InProgress||t.Status== Domain.ProjectManagement.PTaskStatus.ToDo),
                    CreatedAt = p.CreatedAt,
                    EstimateValue = p.EstimateValue,
                    LoggedMinutes= p.LoggedMinutes,
                    

                }).ToListAsync();
        }

    }
}
