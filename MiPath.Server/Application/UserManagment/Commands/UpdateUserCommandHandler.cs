using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.UserManagement.Commands;
using MiPath.Server.Domain.UserManagement;
using MiPath.Server.Infrastructure;
using Microsoft.EntityFrameworkCore;
using MiPath.Server.Domain.UserManagement;

namespace MiPath.Server.Application.UserManagement.Commands
{
    /// <summary>
    /// only used by auth handlers to create/update/merge accounts upon signin with providers
    /// </summary>
    public class UpdateUserCommandHandler : ICommandHandler<UpdateUserCommand, int>
    {
        private readonly IUserRepository userRepository;
        public UpdateUserCommandHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
           

        }
        public async Task<int> Handle(UpdateUserCommand value, CancellationToken cancellationToken)
        {
            var u = await userRepository.GetByIdAsync(value.ID) ?? throw new Exception("user not foud");
            u.Email = value.Email;
            u.GoogleID = value.GoogleID;
            u.GithubID = value.GithubID;
            u.Name = value.Name;
            await userRepository.UpdateAsync(u);
            return u.ID;
        }
    }
}
