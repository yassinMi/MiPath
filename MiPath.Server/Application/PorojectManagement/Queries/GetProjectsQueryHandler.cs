using MiPath.Server.Application.DTO;
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.PorojectManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Application.PorojectManagement.Queries
{
    public class GetProjectsQueryHandler:IQueryHandler<GetProjectsQuery, List<ProjectDto>>
    {
        private readonly IProjectRepository projectRepository;
        public GetProjectsQueryHandler(IProjectRepository projectRepository)
        {
            this.projectRepository = projectRepository;
        }
        public async Task<List<ProjectDto>> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
        {



            return await projectRepository.Query().Include(p => p.Client)
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
