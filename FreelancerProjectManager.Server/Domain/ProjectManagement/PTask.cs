
using System.ComponentModel.DataAnnotations.Schema;

namespace FreelancerProjectManager.Server.Domain.ProjectManagement
{
    public class PTask
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        [ForeignKey(nameof(ProjectID))]
        public int ProjectID { get; set; }
        public Project Project {  get; set; }
        public int? EstimateMinute { get; set; }
    }
}
