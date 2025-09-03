using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiPath.Server.Application.UserManagement.Queries;
using MiPath.Server.Application.UserManagement.Queries.Dto;
using MiPath.Server.Domain.UserManagement;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MiPath.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [HttpGet("me")]
        public async Task<IActionResult> Me([FromServices] GetUserByIdQueryHandler handler)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = User.FindFirstValue(ClaimTypes.Email);
            var name = User.FindFirstValue(ClaimTypes.Name);
            UserDto? user = null;
            if (int.TryParse(userId, out int useridInt_))
            {
                user = await handler.Handle(new GetUserByIdQuery() { UserID = useridInt_ }, CancellationToken.None);
            }
            
            if(user == null)
            {
                return Ok(new { IsGuest = true });
            }
            else
            {
                return Ok(new { UserId = user.ID, Email = user.Email, Name = user.Name });
            }

                
        }
    }
}
