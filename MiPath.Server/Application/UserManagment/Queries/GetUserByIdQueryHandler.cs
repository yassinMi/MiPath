using MiPath.Server.Application.DTO;
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.UserManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Application.UserManagement.Queries
{
    /// <summary>
    /// gets full user model with tasks data
    /// </summary>
    public class GetUserByIdQueryHandler: IQueryHandler<GetUserByIdQuery, UserDto?>
    {
        private readonly IUserRepository userRepository;
        public GetUserByIdQueryHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<UserDto?> Handle(GetUserByIdQuery value, CancellationToken cancellationToken)
        {
            return (await userRepository.Query().Where(p=>p.ID==value.UserID).FirstOrDefaultAsync())?.ToDto();
        }
    }

    
}
