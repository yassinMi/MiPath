using FreelancerProjectManager.Server.Application.DTO;
using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.PorojectManagement.Queries.Dto;
using FreelancerProjectManager.Server.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FreelancerProjectManager.Server.Application.PorojectManagement.Queries
{
    /// <summary>
    /// gets full project model with tasks data
    /// </summary>
    public class GetProjectProgressSummaryQueryHandler : IQueryHandler<GetProjectProgressSummaryQuery, ProjectProgressDto>
    {
        private readonly IProjectRepository projectRepository;
        public GetProjectProgressSummaryQueryHandler(IProjectRepository projectRepository)
        {
            this.projectRepository = projectRepository;
        }
        public async Task<ProjectProgressDto> Handle(GetProjectProgressSummaryQuery value, CancellationToken cancellationToken)
        {
            var p = await projectRepository.Query().Include(p => p.Client).Include(p => p.Tasks).Where(p => p.ID == value.ProjectID).FirstOrDefaultAsync();
            if (p != null)
            {
                return new ProjectProgressDto() { CompletedCount = p.GetCompletedTasksCount(), PlannedCount = p.GetCompletedTasksCount() };
            }
            else
            {
                throw new EntityNotFoundException();
            }
        }
    }

    
}
