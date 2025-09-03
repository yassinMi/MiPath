using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.UserManagement.Commands;
using MiPath.Server.Infrastructure;

namespace MiPath.Server.Application.UserManagement.Commands
{
    public class DeleteUserCommandHandler : ICommandHandler<DeleteUserCommand>
    {
        private readonly IUserRepository userRepository;
        public DeleteUserCommandHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
       
        public async Task Handle(DeleteUserCommand value, CancellationToken ct)
        {
           await userRepository.DeleteAsync(value.ID);
        }
    }
}
