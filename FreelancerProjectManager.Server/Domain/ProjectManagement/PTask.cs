
using System.ComponentModel.DataAnnotations.Schema;

namespace FreelancerProjectManager.Server.Domain.ProjectManagement
{
    public class PTask
    {
        public string ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        [ForeignKey(nameof(ProjectID))]
        public string ProjectID { get; set; }
        public Project Project {  get; set; }
        public int? EstimateMinute { get; set; }
    }
}
