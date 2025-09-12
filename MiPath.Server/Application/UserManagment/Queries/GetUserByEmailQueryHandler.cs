using MiPath.Server.Application.DTO;
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.UserManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Application.UserManagement.Queries
{
    /// <summary>
    /// gets full user model with tasks data
    /// </summary>
    public class GetUserByEmailQueryHandler: IQueryHandler<GetUserByEmailQuery, UserDto?>
    {
        private readonly IUserRepository userRepository;
        public GetUserByEmailQueryHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<UserDto?> Handle(GetUserByEmailQuery value, CancellationToken cancellationToken)
        {
            if (value.GoogleID != null)
            {
                return (await userRepository.Query().Where(p => p.GoogleID == value.GoogleID).FirstOrDefaultAsync())?.ToDto();
            }
            else if (value.GithubID != null)
            {
                return (await userRepository.Query().Where(p => p.GithubID == value.GithubID).FirstOrDefaultAsync())?.ToDto();
            }
            else if (value.Email != null)
            {
                return (await userRepository.Query().Where(p => p.Email == value.Email).FirstOrDefaultAsync())?.ToDto();
            }

            throw new Exception("must provide one of : google id, github id, email");


        }
    }

    
}
