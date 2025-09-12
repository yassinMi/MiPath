namespace MiPath.Server.Application.UserManagement.Commands
{
   
    public class UpdateUserCommand
    {
        public int ID { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public string? GoogleID { get; set; }
        public string? GithubID { get; set; }

    }

}
