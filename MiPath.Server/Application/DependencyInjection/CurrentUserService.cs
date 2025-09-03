using MiPath.Server.Application.Interfaces;
using System.Security.Claims;

namespace MiPath.Server.Application.DependencyInjection
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int? UserId => int.TryParse(_httpContextAccessor.HttpContext?.User
                            .FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

        public string? Email => _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email);
    }

}
