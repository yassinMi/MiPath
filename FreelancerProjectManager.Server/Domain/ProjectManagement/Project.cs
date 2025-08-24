using System.ComponentModel.DataAnnotations.Schema;

namespace FreelancerProjectManager.Server.Domain.ProjectManagement
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
        public string Name { get; set; }
        public string Description { get; set; }
        [ForeignKey(nameof(Client))]
        public int ClientID { get; set; }
        public Client Client { get;set; }
        public List<PTask> Tasks { get; set; }
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

    }
}
