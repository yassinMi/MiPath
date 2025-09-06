using MiPath.Server.Application.Interfaces;

namespace MiPath.Server.Application.TaskManagement.Commands
{
    public class MarkTaskAsCommandHandler:ICommandHandler<MarkTaskAsCommand>
    {
        private readonly ITaskRepository taskRepository;
        private readonly ICurrentUserService currentUser;

        public MarkTaskAsCommandHandler(ITaskRepository taskRepository, ICurrentUserService currentUser)
        {
            this.taskRepository = taskRepository;
            this.currentUser = currentUser;
        }

        public async Task Handle(MarkTaskAsCommand value, CancellationToken cancellationToken)
        {
            var task =  await taskRepository.GetById(value.ID);
            if (task == null)
            {
                throw new EntityNotFoundException("task",value.ID);
            }
            if (currentUser.UserId == null) { throw new UnauthorizedAccessException("User not authenticated"); }
            var existsAndAllowed = taskRepository.GetAll().Any(t => t.ID == value.ID && t.Project!.UserID == currentUser.UserId);
            if (!existsAndAllowed) { throw new InvalidOperationException("task not found or not owned by the current user"); }

            //todo enforce business rules per intent
            switch (value.Intent)
            {
                case MarkTaskAsCommand.MarkAs.InProgress:
                    task.Status = Domain.ProjectManagement.PTaskStatus.InProgress;
                    break;
                case MarkTaskAsCommand.MarkAs.Completed:
                    task.Status = Domain.ProjectManagement.PTaskStatus.Done;
                    break;
                case MarkTaskAsCommand.MarkAs.ReOpen:
                    task.Status = Domain.ProjectManagement.PTaskStatus.ToDo;
                    break;
                default:
                    throw new ArgumentException("unknown action");
            }
            if (value.Intent == MarkTaskAsCommand.MarkAs.Completed)
            {
                task.CompletedAt = DateTime.UtcNow;
            }
            else
            {
                task.CompletedAt = null;
            }
            await taskRepository.UpdateAsync(task);
        }
    }
}
