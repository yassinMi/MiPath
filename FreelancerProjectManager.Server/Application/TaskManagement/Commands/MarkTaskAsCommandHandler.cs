using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FreelancerProjectManager.Server.Application.TaskManagement.Commands
{
    public class MarkTaskAsCommandHandler:ICommandHandler<MarkTaskAsCommand>
    {
        private readonly ITaskRepository taskRepository;
        public MarkTaskAsCommandHandler(ITaskRepository taskRepository)
        {
            this.taskRepository = taskRepository;
        }

        public async Task Handle(MarkTaskAsCommand value, CancellationToken cancellationToken)
        {
            var task =  await taskRepository.GetById(value.ID);
            if (task == null)
            {
                throw new ArgumentException("task not found");
            }
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
