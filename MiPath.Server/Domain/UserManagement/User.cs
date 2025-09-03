using MiPath.Server.Domain.ProjectManagement;
using System.ComponentModel.DataAnnotations;

namespace MiPath.Server.Domain.UserManagement
{

    
        public class User
        {
            [Key]
            public int ID { get; set; }

            [Required]
            [EmailAddress]
            public string Email { get; set; } = string.Empty;

            public string? Name { get; set; }

            public DateTime CreatedAt { get; set; }
            public DateTime? LastLoginAt { get; set; }

            public bool IsAdmin { get; set; } = false;

            public ICollection<Project>? Projects { get; set; }
        }

}
