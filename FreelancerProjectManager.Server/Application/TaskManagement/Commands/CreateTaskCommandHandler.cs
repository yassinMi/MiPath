using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Domain.ProjectManagement;
using FreelancerProjectManager.Server.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace FreelancerProjectManager.Server.Application.TaskManagement.Commands
{
    public class CreateTaskCommandHandler: ICommandHandler<CreateTaskCommand, int>
    {
        private readonly ITaskRepository taskRepository;
        private readonly IProjectRepository projectRepository;
        public CreateTaskCommandHandler(ITaskRepository taskRepository, IProjectRepository projectRepository)
        {
            this.taskRepository = taskRepository;
            this.projectRepository = projectRepository;
        }
        public async Task<int> Handle(CreateTaskCommand value, CancellationToken cancellationToken)
        {
            var project = await projectRepository.GetByIdAsync(value.ProjectID);
            if (project == null)
            {
                throw new ArgumentException("ProjectID not found");
            }
            var t = new Domain.ProjectManagement.PTask();
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
