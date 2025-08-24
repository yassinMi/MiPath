using FreelancerProjectManager.Server.Application.Interfaces;

namespace FreelancerProjectManager.Server.Application.TaskManagement.Commands
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
