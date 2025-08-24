using FreelancerProjectManager.Server.Domain.ProjectManagement;

namespace FreelancerProjectManager.Server.Application.TaskManagement.Queries
{
    public class GetTasksQuery
    {

        public List<PTaskStatus> Statuses { get; set; } = new();
        public bool? IsOverdue { get; set; }

        public DateTime? DueDateMin { get; set; }
        public DateTime? DueDateMax { get; set; }
        public DateTime? PlannedStartMin { get; set; }
        public DateTime? PlannedStartMax { get; set; }
        public DateTime? CreatedAtMin { get; set; }
        public DateTime? CreatedAtMax { get; set; }
        public DateTime? CompletedAtMin { get; set; }
        public DateTime? CompletedAtMax { get; set; }

        public int? ProjectID { get; set; }
        public bool isDescending { get; set; }
        public string OrderByProperty { get; set; }
    }
}
