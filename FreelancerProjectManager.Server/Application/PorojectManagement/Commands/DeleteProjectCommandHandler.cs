using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.PorojectManagement.Commands;
using FreelancerProjectManager.Server.Infrastructure;

namespace FreelancerProjectManager.Server.Application.PorojectManagement.Commands
{
    public class DeleteProjectCommandHandler:ICommandHandler<DeleteProjectCommand>
    {
        private readonly IProjectRepository projectRepository;
        public DeleteProjectCommandHandler(IProjectRepository projectRepository)
        {
            this.projectRepository = projectRepository;
        }
       
        public async Task Handle(DeleteProjectCommand value, CancellationToken ct)
        {
           await projectRepository.DeleteAsync(value.ID);
        }
    }
}
