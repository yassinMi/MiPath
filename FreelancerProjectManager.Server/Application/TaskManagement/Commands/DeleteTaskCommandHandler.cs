using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.PorojectManagement.Commands;
using FreelancerProjectManager.Server.Infrastructure;

namespace FreelancerProjectManager.Server.Application.PorojectManagement.Commands
{
    public class DeleteTaskCommandHandler:ICommandHandler<DeleteTaskCommand>
    {
        private readonly ITaskRepository taskRepository;
        public DeleteTaskCommandHandler(ITaskRepository taskRepository)
        {
            this.taskRepository = taskRepository;
        }
       
        public async Task Handle(DeleteTaskCommand value, CancellationToken ct)
        {
           await taskRepository.DeleteAsync(value.ID);
        }
    }
}
