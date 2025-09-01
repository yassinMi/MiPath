namespace MiPath.Server.Application.PorojectManagement.Commands
{
    public class CloseProjectAsCommand
    {
        public enum CloseAs
        {
            Canceld,
            Completed
        }
        public int ID { get; set; }
        public CloseAs Intent { get; set; }
        public bool ForceCompleteOpenTasks { get; set; }
    }
}
