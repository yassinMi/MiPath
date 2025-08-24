using FreelancerProjectManager.Server.Application.DTO;
using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.PorojectManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace FreelancerProjectManager.Server.Application.PorojectManagement.Queries
{
    /// <summary>
    /// gets full project model with tasks data
    /// </summary>
    public class GetProjectByIdQueryHandler: IQueryHandler<GetProjectByIdQuery, ProjectDto?>
    {
        private readonly IProjectRepository projectRepository;
        public GetProjectByIdQueryHandler(IProjectRepository projectRepository)
        {
            this.projectRepository = projectRepository;
        }
        public async Task<ProjectDto?> Handle(GetProjectByIdQuery value, CancellationToken cancellationToken)
        {
            return (await projectRepository.Query().Include(p=>p.Client).Include(p=>p.Tasks).Where(p=>p.ID==value.ProjectID).FirstOrDefaultAsync())?.ToDto();
        }
    }

    
}
