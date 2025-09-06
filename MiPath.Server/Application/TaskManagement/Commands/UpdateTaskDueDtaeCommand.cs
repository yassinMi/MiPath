namespace MiPath.Server.Application.TaskManagement.Commands
{
    public class UpdateTaskDueDateCommand
    {
        public int ID { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
