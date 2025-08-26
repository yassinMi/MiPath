namespace FreelancerProjectManager.Server.Application.TaskManagement.Commands
{
    public class CreateTaskCommand
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public int ProjectID { get; set; }
        public int? EstimateMinute { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? PlannedStart { get; set; }

    }
}
