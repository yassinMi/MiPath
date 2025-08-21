using System.ComponentModel.DataAnnotations.Schema;

namespace FreelancerProjectManager.Server.Domain.ProjectManagement
{
    public class Project 
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [ForeignKey(nameof(Client))]
        public int ClientID { get; set; }
        public Client Client { get;set; }
        public List<PTask> Tasks { get; set; }

    }
}
