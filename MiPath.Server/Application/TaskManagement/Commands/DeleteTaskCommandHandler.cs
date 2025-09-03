using MiPath.Server.Application.Interfaces;

namespace MiPath.Server.Application.TaskManagement.Commands
{
    public class DeleteTaskCommandHandler:ICommandHandler<DeleteTaskCommand>
    {
        private readonly ITaskRepository taskRepository;
        private readonly ICurrentUserService currentUser;

        public DeleteTaskCommandHandler(ITaskRepository taskRepository,ICurrentUserService currentUser)
        {
            this.taskRepository = taskRepository;
            this.currentUser = currentUser;
        }

        public async Task Handle(DeleteTaskCommand value, CancellationToken ct)
        {
            if (currentUser?.UserId == null) throw new Exception("no current user");
            var existsAndAllowed = taskRepository.GetAll().Any(t=>t.ID == value.ID && t.Project!.UserID== currentUser.UserId);
            if (!existsAndAllowed) { throw new InvalidOperationException("task not found or not owned by the current user"); }
            await taskRepository.DeleteAsync(value.ID);
        }
    }
}
