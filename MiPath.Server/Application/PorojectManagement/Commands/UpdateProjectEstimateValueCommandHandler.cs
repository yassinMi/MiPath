using MiPath.Server.Application.Interfaces;

namespace MiPath.Server.Application.PorojectManagement.Commands
{
    public class UpdateProjectEstimateValueCommandHandler : ICommandHandler<UpdateProjectEstimateValueCommand>
    {
        private readonly IProjectRepository projectRepository;
        private readonly ICurrentUserService currentUser;

        public UpdateProjectEstimateValueCommandHandler(IProjectRepository projectRepository, ICurrentUserService currentUser)
        {
            this.projectRepository = projectRepository;
            this.currentUser = currentUser;
        }

        public async Task Handle(UpdateProjectEstimateValueCommand value, CancellationToken cancellationToken)
        {
            var project = await projectRepository.GetByIdAsync(value.ID);
            if (project == null)
            {
                throw new EntityNotFoundException("project", value.ID);
            }
            if (currentUser.UserId == null) { throw new UnauthorizedAccessException("User not authenticated"); }
            if (project.UserID != currentUser.UserId) { throw new InvalidOperationException("project not owned by the current user"); }

            project.EstimateValue = value.EstimateValue;
            await projectRepository.UpdateAsync(project);
        }
    }
}
