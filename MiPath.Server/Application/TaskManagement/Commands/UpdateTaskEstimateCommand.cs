namespace MiPath.Server.Application.TaskManagement.Commands
{
    public class UpdateTaskEstimateCommand
    {
        public int ID { get; set; }
        public int? EstimateMinute { get; set; }
    }
}
