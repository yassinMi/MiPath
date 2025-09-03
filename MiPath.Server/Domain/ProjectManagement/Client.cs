using MiPath.Server.Domain.UserManagement;
using System.ComponentModel.DataAnnotations.Schema;

namespace MiPath.Server.Domain.ProjectManagement
{
    public class Client
    {
        public int ID { get; set; }
        public required string Name { get; set; }
        public List<Project>? Projects { get; set; }

        [ForeignKey(nameof(User))]
        public int UserID { get; set; }
        public User? User { get; set; }

    }
}
