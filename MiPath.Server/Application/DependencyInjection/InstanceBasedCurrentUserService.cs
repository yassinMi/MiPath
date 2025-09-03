using MiPath.Server.Application.Interfaces;
using MiPath.Server.Domain.UserManagement;

namespace MiPath.Server.Application.DependencyInjection
{
    public class InstanceBasedCurrentUserService:ICurrentUserService
    {
        public InstanceBasedCurrentUserService(User user)
        {
                this.user = user;
        }
        readonly User user;

        public int? UserId => user.ID;

        public string? Email => user.Email;
    }
}
