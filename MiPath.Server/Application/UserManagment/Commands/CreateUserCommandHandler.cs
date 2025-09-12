using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.UserManagement.Commands;
using MiPath.Server.Domain.UserManagement;
using MiPath.Server.Infrastructure;
using Microsoft.EntityFrameworkCore;
using MiPath.Server.Domain.UserManagement;

namespace MiPath.Server.Application.UserManagement.Commands
{
    public class CreateUserCommandHandler : ICommandHandler<CreateUserCommand, int>
    {
        private readonly IUserRepository userRepository;
        public CreateUserCommandHandler(ICurrentUserService _currentUser, IUserRepository userRepository)
        {
            this.userRepository = userRepository;

        }
        public async Task<int> Handle(CreateUserCommand value, CancellationToken cancellationToken)
        {
            var u = new User() { Email = value.Email, Name= value.Name, CreatedAt = DateTime.UtcNow, GoogleID=value.GoogleID, GithubID=value.GithubID };
            await userRepository.AddAsync(u);
            return u.ID;
        }
    }
}
