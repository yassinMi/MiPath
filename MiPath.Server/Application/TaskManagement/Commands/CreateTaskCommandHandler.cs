using MiPath.Server.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Application.TaskManagement.Commands
{
    public class CreateTaskCommandHandler: ICommandHandler<CreateTaskCommand, int>
    {
        private readonly ITaskRepository taskRepository;
        private readonly IProjectRepository projectRepository;
        private readonly ICurrentUserService currentUser;

        public CreateTaskCommandHandler(ITaskRepository taskRepository, IProjectRepository projectRepository, ICurrentUserService currentUser)
        {
            this.taskRepository = taskRepository;
            this.projectRepository = projectRepository;
            this.currentUser = currentUser;
        }
        public async Task<int> Handle(CreateTaskCommand value, CancellationToken cancellationToken)
        {
            if (currentUser?.UserId == null) throw new InvalidOperationException("no current user");
            var projectExists = await projectRepository.Query().AnyAsync(p=>p.ID==value.ProjectID && currentUser.UserId== p.UserID);
            if (projectExists == false)
            {
                throw new ArgumentException("ProjectID not found or not owned by the current user");
            }
            var t = new Domain.ProjectManagement.PTask() { Description=value.Description,Title=value.Title};
            t.Title = value.Title;
            t.Description = value.Description;
            t.ProjectID = value.ProjectID;
            t.EstimateMinute = value.EstimateMinute;
            t.DueDate = value.DueDate;
            t.PlannedStart = value.PlannedStart;
            t.CreatedAt = DateTime.UtcNow;
            t.Status = Domain.ProjectManagement.PTaskStatus.ToDo;
            t = await taskRepository.AddAsync(t);
            return t.ID;
        }
    }
}
