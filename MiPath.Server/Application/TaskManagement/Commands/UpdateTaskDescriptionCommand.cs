namespace MiPath.Server.Application.TaskManagement.Commands
{
    /// <summary>
    /// null value will not be merged
    /// </summary>
    public class UpdateTaskDescriptionCommand
    {
        public int ID { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? EstimateMinute { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? PlannedStart { get; set; }
    }
}
