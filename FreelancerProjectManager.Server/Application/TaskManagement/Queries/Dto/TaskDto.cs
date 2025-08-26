using FreelancerProjectManager.Server.Domain.ProjectManagement;

namespace FreelancerProjectManager.Server.Application.TaskManagement.Queries.Dto
{
    public class TaskDto
    {
        public int ID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }

        public int ProjectID { get; set; }
        public int? EstimateMinute { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? PlannedStart { get; set; }
        public PTaskStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }

    }
}
