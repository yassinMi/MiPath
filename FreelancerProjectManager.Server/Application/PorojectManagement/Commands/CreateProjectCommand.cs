namespace FreelancerProjectManager.Server.Application.PorojectManagement.Commands
{
   
    public class CreateProjectCommand
    {
        public enum ProjectCreationStatus
        {
            Scoping,
            Active
        }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public int? ClientID { get; set; }
        /// <summary>
        /// specify if ClientID is not provided, create a new client with this name
        /// </summary>
        public string? NewClientName { get; set; }
        public ProjectCreationStatus Status { get; set; }
    }

}
