using MiPath.Server.Application.Interfaces;

namespace MiPath.Server.Application.TaskManagement.Commands
{
    public class UpdateTaskDueDateCommandHandler : ICommandHandler<UpdateTaskDueDateCommand>
    {
        private readonly ITaskRepository taskRepository;
        private readonly ICurrentUserService currentUser;

        public UpdateTaskDueDateCommandHandler(ITaskRepository taskRepository, ICurrentUserService currentUser)
        {
            this.taskRepository = taskRepository;
            this.currentUser = currentUser;
        }

        public async Task Handle(UpdateTaskDueDateCommand value, CancellationToken cancellationToken)
        {
            var task = await taskRepository.GetById(value.ID);
            if (task == null)
            {
                throw new EntityNotFoundException("task", value.ID);
            }
            if (currentUser.UserId == null) { throw new UnauthorizedAccessException("User not authenticated"); }
            var existsAndAllowed = taskRepository.GetAll().Any(t => t.ID == value.ID && t.Project!.UserID == currentUser.UserId);
            if (!existsAndAllowed) { throw new InvalidOperationException("task not found or not owned by the current user"); }

            task.DueDate = value.DueDate;
            await taskRepository.UpdateAsync(task);
        }
    }
}
