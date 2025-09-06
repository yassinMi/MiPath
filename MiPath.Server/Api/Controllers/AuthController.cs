using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MiPath.Server.Application.UserManagement.Commands;
using MiPath.Server.Application.UserManagement.Queries;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MiPath.Server.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly IConfiguration _config;
        readonly ILogger<AuthController> logger;
        public AuthController(IConfiguration config, ILogger<AuthController> logger)
        {
            _config = config;
            this.logger = logger;
        }
        [HttpGet("google-login")]
        public ChallengeResult Login()
        {
            logger.LogInformation("login request");
            var redirectUrl = Url.Action("GoogleResponse", "Auth", null, "https");
            logger.LogInformation($"redirecting to {redirectUrl}");
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }
        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleResponse([FromServices] CreateUserCommandHandler createUserHangler, [FromServices] GetUserByEmailQueryHandler queryUserByEmailHandler)
        {
            logger.LogInformation($"GoogleResponse called");
            var result = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);
            if (!result.Succeeded)
                return Unauthorized();

            var email = result.Principal?.FindFirst(ClaimTypes.Email)?.Value;
            var googleId = result.Principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
           
            var userName = result.Principal?.FindFirst(ClaimTypes.Name)?.Value;
            if (email == null) throw new Exception("email null");
            if (userName == null) throw new Exception("userName null");

            string? token;

            var maybeUser = await queryUserByEmailHandler.Handle(new GetUserByEmailQuery() { Email = email }, CancellationToken.None);
            if (maybeUser == null)
            {
                logger.LogInformation($"user doesn't exist, creating a new one");
                var newUserCommand = new CreateUserCommand() { Email = email, Name = userName };
                var userId = await createUserHangler.Handle(newUserCommand, CancellationToken.None);
                logger.LogInformation($"user created with id: {userId}");
                token = GenerateJwtToken(userId.ToString(), email, userName);

            }
            else
            {
                var userId = maybeUser.ID;
                logger.LogInformation($"user exists with is ${userId}");
                token = GenerateJwtToken(userId.ToString(), email, userName);
            }

            var html = $@"
        <script>
            window.opener.postMessage({{ token: '{token}' }}, '*');
            window.close();
        </script>";

            return Content(html, "text/html");
        }
        private string GenerateJwtToken(string userId, string email, string userName)
        {

            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, userId),
        new Claim(ClaimTypes.Email, email) ,
        new Claim(ClaimTypes.Name, userName) ,
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["MPJwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["MPJwt:Issuer"],
                audience: _config["MPJwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
