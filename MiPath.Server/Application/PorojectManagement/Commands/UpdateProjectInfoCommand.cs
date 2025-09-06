namespace MiPath.Server.Application.PorojectManagement.Commands
{
    public class UpdateProjectInfoCommand
    {
        public int ID { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }

    }
}
