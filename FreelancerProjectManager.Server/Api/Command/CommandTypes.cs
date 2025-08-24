using FreelancerProjectManager.Server.Domain.ProjectManagement;
using System.Resources;

namespace FreelancerProjectManager.Server.Api.Command
{
    public enum ProjectCreationStatus
    {
        Scoping,
        Active
    }
    public class CreateProjectCommand
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? ClientID { get; set; }
        /// <summary>
        /// specify if ClientID is not provided, create a new client with this name
        /// </summary>
        public string? NewClientName { get; set; }
        public ProjectCreationStatus Status { get; set; }
    }

    public class UpdateProjectInfoCommand
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
    public class UpdateProjectEstimateValueCommand
    {
        public int ID { get; set; }
        public decimal EstimateValue { get; set; }
    }
    public class CloseProjectAsCommand
    {
        public enum CloseAs
        {
            Canceld,
            Completed
        }
        public int ID { get; set; }
        public CloseAs Reason { get; set; }
    }
    public class CreateTaskCommand
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int ProjectID { get; set; }
        public int? EstimateMinute { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? PlannedStart { get; set; }

    }

    public class UpdateTaskCommand
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? EstimateMinute { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? PlannedStart { get; set; }
    }
    public class MarkTaskAsCommand
    {
        public enum MarkAs
        {
            InProgress,
            Completed,
            ReOpen
        }
        public int ID { get; set; }
        public MarkAs Status { get; set; }
    }
}
