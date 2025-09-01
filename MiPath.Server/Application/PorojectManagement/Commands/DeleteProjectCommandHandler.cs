using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.PorojectManagement.Commands;
using MiPath.Server.Infrastructure;

namespace MiPath.Server.Application.PorojectManagement.Commands
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
