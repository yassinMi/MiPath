using MiPath.Server.Application.Interfaces;

namespace MiPath.Server.Application.TaskManagement.Commands
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
