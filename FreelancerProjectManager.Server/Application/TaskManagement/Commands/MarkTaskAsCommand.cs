namespace FreelancerProjectManager.Server.Application.TaskManagement.Commands
{
    public class MarkTaskAsCommand
    {
        public enum MarkAs
        {
            InProgress,
            Completed,
            ReOpen
        }
        public int ID { get; set; }
        public MarkAs Intent { get; set; }
    }
}
