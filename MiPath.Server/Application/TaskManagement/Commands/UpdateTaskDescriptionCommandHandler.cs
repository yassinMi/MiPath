using MiPath.Server.Application.Interfaces;

namespace MiPath.Server.Application.TaskManagement.Commands
{
    public class UpdateTaskDescriptionCommandHandler
    {
        private readonly IProjectRepository projectRepository;
        public UpdateTaskDescriptionCommandHandler(IProjectRepository projectRepository)
        {
            this.projectRepository = projectRepository;
        }
    }
}
