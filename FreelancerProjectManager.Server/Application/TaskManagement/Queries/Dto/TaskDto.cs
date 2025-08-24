namespace FreelancerProjectManager.Server.Application.TaskManagement.Queries.Dto
{
    public class TaskDto
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public int ProjectID { get; set; }
        public int? EstimateMinute { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? PlannedStart { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }

    }
}
