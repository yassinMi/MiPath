namespace FreelancerProjectManager.Server.Api.Command
{
    public class CreateProjectCommand
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? ClientID { get; set; }
        public string? ClientName { get; set; }
    }

    public class UpdateProjectCommand
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class CreateTaskCommand
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ProjectID { get; set; }
        public int? EstimateMinute { get; set; }
    }

    public class UpdateTaskCommand
    {
        public string ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? EstimateMinute { get; set; }
    }

}
