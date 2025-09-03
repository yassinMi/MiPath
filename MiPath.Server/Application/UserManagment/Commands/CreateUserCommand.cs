namespace MiPath.Server.Application.UserManagement.Commands
{
   
    public class CreateUserCommand
    {
       
        public required string Name { get; set; }
        public required string Email { get; set; }
        
    }

}
