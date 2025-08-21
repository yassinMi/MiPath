namespace FreelancerProjectManager.Server.Domain.ProjectManagement
{
    public class Client
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public List<Project> Projects { get; set; } 

    }
}
