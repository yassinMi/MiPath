namespace FreelancerProjectManager.Server.Api.DTO
{
    public class ProjectDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int ClientID { get; set; }
        public ClientDto Client { get; set; }

        public List<TaskDto> Tasks { get; set; } = new();
    }
    public class ClientDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }

    public class TaskDto
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public int ProjectID { get; set; }
        public int? EstimateMinute { get; set; }
    }
}
