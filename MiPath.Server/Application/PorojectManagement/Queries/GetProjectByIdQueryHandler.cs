using MiPath.Server.Application.DTO;
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.PorojectManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Application.PorojectManagement.Queries
{
    /// <summary>
    /// gets full project model with tasks data
    /// </summary>
    public class GetProjectByIdQueryHandler: IQueryHandler<GetProjectByIdQuery, ProjectDto?>
    {
        private readonly IProjectRepository projectRepository;
        private readonly ICurrentUserService currentUser;

        public GetProjectByIdQueryHandler(IProjectRepository projectRepository, ICurrentUserService currentUser)
        {
            this.projectRepository = projectRepository;
            this.currentUser = currentUser;
        }
        public async Task<ProjectDto?> Handle(GetProjectByIdQuery value, CancellationToken cancellationToken)
        {
            var proj = (await projectRepository.Query().Include(p => p.Client).Include(p => p.Tasks).Where(p => p.ID == value.ProjectID).FirstOrDefaultAsync());
            if (proj != null)
            {
                if (proj.UserID != currentUser.UserId) throw new InvalidOperationException($"project is not owned by the current user '{currentUser.UserId}'");
            }
            return proj?.ToDto();
        }
    }

    
}
