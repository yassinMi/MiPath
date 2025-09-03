using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.PorojectManagement.Commands;
using MiPath.Server.Infrastructure;

namespace MiPath.Server.Application.PorojectManagement.Commands
{
    public class CloseProjectAsCommandHandler:ICommandHandler<CloseProjectAsCommand>
    {
        private readonly IProjectRepository projectRepository;
        private readonly ICurrentUserService currentUser;
        public CloseProjectAsCommandHandler(IProjectRepository projectRepository, ICurrentUserService currentUser)
        {
            this.projectRepository = projectRepository;
            this.currentUser = currentUser;
        }
        public async Task Handle(CloseProjectAsCommand value, CancellationToken ct)
        {
            //once closed, cannot be reopened
            if (currentUser?.UserId == null) throw new Exception("no current user");
            var project = await projectRepository.GetByIdAsync(value.ID);
            if (project == null)
            {
                throw new ArgumentException("ProjectID not found");
            }
            if (project.UserID != currentUser.UserId) throw new InvalidOperationException("project not owned by the current user");
            if (project.Status == Domain.ProjectManagement.ProjectStatus.Canceled
                || project.Status == Domain.ProjectManagement.ProjectStatus.Completed)
            {
                throw new InvalidOperationException("Project is already closed");
            }
            project.Status = value.Intent == CloseProjectAsCommand.CloseAs.Completed ? Domain.ProjectManagement.ProjectStatus.Completed
                : value.Intent == CloseProjectAsCommand.CloseAs.Canceld ? Domain.ProjectManagement.ProjectStatus.Canceled
                : throw new ArgumentException("unknown close reason");

            //todo consider updating child tasks's availability for fast queriying 
            await projectRepository.UpdateAsync(project);
        }
    }
}
