using FreelancerProjectManager.Server.Application.DTO;
using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.PorojectManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace FreelancerProjectManager.Server.Application.PorojectManagement.Queries
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
                    Status = p.Status.ToString(),
                    TaskCount = p.Tasks.Count,
                }).ToListAsync();
        }

    }
}
