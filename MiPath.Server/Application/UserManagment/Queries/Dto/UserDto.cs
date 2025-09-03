using MiPath.Server.Domain.UserManagement;

namespace MiPath.Server.Application.UserManagement.Queries.Dto
{
    public class UserDto
    {
        public int ID { get; set; }
        public required string Name { get; set; }
        public string? Email { get; set; }
        
        

    }
   

    
}
