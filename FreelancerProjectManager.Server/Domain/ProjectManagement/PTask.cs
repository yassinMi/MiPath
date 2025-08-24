
using System.ComponentModel.DataAnnotations.Schema;

namespace FreelancerProjectManager.Server.Domain.ProjectManagement
{
    public enum PTaskStatus
    {
        ToDo,
        InProgress,
        Done,
        Canceled
    }
    public class PTask
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public PTaskStatus Status { get; set; }
        public string Description { get; set; }
        [ForeignKey(nameof(ProjectID))]
        public int ProjectID { get; set; }
        public Project Project {  get; set; }
        public int? EstimateMinute { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? PlannedStart { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }

    }
}
