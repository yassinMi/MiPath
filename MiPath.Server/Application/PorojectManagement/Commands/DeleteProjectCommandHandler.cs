using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.PorojectManagement.Commands;
using MiPath.Server.Infrastructure;
using MiPath.Server.Infrastructure.Repositories;

namespace MiPath.Server.Application.PorojectManagement.Commands
{
    public class DeleteProjectCommandHandler:ICommandHandler<DeleteProjectCommand>
    {
        private readonly IProjectRepository projectRepository;
        private readonly ICurrentUserService currentUser;

        public DeleteProjectCommandHandler(IProjectRepository projectRepository, ICurrentUserService currentUser)
        {
            this.projectRepository = projectRepository;
            this.currentUser = currentUser;
        }

        public async Task Handle(DeleteProjectCommand value, CancellationToken ct)
        {
            if (currentUser?.UserId == null) throw new Exception("no current user");
            var existsAndAllowed = projectRepository.Query().Any(t => t.ID == value.ID && t.UserID == currentUser.UserId);
            if (!existsAndAllowed) { throw new InvalidOperationException("project not found or not owned by the current user"); }

            await projectRepository.DeleteAsync(value.ID);
        }
    }
}
