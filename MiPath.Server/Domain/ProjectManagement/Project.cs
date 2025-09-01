using System.ComponentModel.DataAnnotations.Schema;

namespace MiPath.Server.Domain.ProjectManagement
{
    public enum ProjectStatus
    {
        Scoping,
        Active,
        OnHold,
        Completed,
        Canceled
    }
    public class Project 
    {
       
        public int ID { get; set; }
        public ProjectStatus Status { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        [ForeignKey(nameof(Client))]
        public int ClientID { get; set; }
        public required Client Client { get;set; }
        public List<PTask>? Tasks { get; set; }
        public DateTime CreatedAt { get; set; }

        public int LoggedMinutes { get; set; }
        public decimal? EstimateValue { get; set; }

        public decimal? GetActualHourlyRate()
        {
            if(EstimateValue==null || EstimateValue<=0 || LoggedMinutes<=0)
            {
                return null;
            }
            return (EstimateValue.Value/(LoggedMinutes/60m));
        }

        public int GetPlannedTasksCount()
        {
            if(Tasks==null) throw new InvalidOperationException("tasks null");
            return Tasks.Count(t => t.Status != PTaskStatus.Canceled);
        }
        public int GetCompletedTasksCount()
        {
            if (Tasks == null) throw new InvalidOperationException("tasks null");
            return Tasks.Count(t => t.Status == PTaskStatus.Done);
        }

        
    }
}
