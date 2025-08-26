using FreelancerProjectManager.Server.Application.ClientManagement.Queries.Dto;
using FreelancerProjectManager.Server.Application.TaskManagement.Queries.Dto;
using FreelancerProjectManager.Server.Domain.ProjectManagement;

namespace FreelancerProjectManager.Server.Application.PorojectManagement.Queries.Dto
{
    public class ProjectDto
    {
        public int ID { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }

        public int ClientID { get; set; }
        public required ClientDto Client { get; set; }

        public List<TaskDto>? Tasks { get; set; } = new();
        public ProjectStatus Status { get; set; }
        public int LoggedMinutes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public int TaskCount { get; set; }
        public int? CompletedTasksCount { get; set; }
        public int? PlannedTasksCount { get; set; }
        public decimal? EstimateValue { get; set; }
        

    }
   

    
}
