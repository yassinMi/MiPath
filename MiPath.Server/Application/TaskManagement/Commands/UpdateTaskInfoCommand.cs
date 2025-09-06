namespace MiPath.Server.Application.TaskManagement.Commands
{
    public class UpdateTaskInfoCommand
    {
        public int ID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}
