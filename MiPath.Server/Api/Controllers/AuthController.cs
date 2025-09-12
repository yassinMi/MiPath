using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MiPath.Server.Application.UserManagement.Commands;
using MiPath.Server.Application.UserManagement.Queries;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Nodes;

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

            var maybeUser = await queryUserByEmailHandler.Handle(new GetUserByEmailQuery() { GoogleID = googleId }, CancellationToken.None);
            if (maybeUser == null)
            {
                logger.LogInformation($"user doesn't exist, creating a new one");
                var newUserCommand = new CreateUserCommand() { Email = email, Name = userName, GoogleID= googleId  };
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




        #region github
        [HttpGet("github-login")]
        public IActionResult LoginGithub()
        {
            var clientId = _config["MPGithub:AuthClientId"];
            var callbackUrl = _config["MPGithub:AuthCallbackUri"];
            var state = Guid.NewGuid().ToString();
            if (string.IsNullOrEmpty(clientId)) throw new Exception("github client id not provided");
            if (string.IsNullOrEmpty(callbackUrl)) throw new Exception("github callback url not provided");
            
            return Redirect($"https://github.com/login/oauth/authorize?client_id={clientId}&redirect_uri={callbackUrl}&scope=read:user user:email&state={state}");
        }
        [HttpGet("github-auth")]
        public async Task<IActionResult> LoginGithubCallbackHandler([FromServices] CreateUserCommandHandler createUserHangler, [FromServices] GetUserByEmailQueryHandler queryUserByEmailHandler)
        {
            var clientId = _config["MPGithub:AuthClientId"];
            var clientSecret = _config["MPGithub:AuthClientSecret"];
            var callbackUrl = _config["MPGithub:AuthCallbackUri"];
            if (string.IsNullOrEmpty(clientId)) throw new Exception("github client id not provided");
            if (string.IsNullOrEmpty(callbackUrl)) throw new Exception("github callback url not provided");
            if (string.IsNullOrEmpty(clientSecret)) throw new Exception("github clientSecret not provided");
            var code = HttpContext.Request.Query["code"].FirstOrDefault() ?? throw new Exception("expected code from github redirect");
            var state = HttpContext.Request.Query["state"].FirstOrDefault() ?? throw new Exception("expected state from github redirect");
            //todo: validate state by caching it
            //exchanging code for token
            using var client = new HttpClient();
            client.DefaultRequestHeaders.UserAgent.ParseAdd("mi-path");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            var requestBody = new[]
            {
            new KeyValuePair<string, string>("client_id", clientId),
            new KeyValuePair<string, string>("client_secret", clientSecret),
            new KeyValuePair<string, string>("code", code),
            new KeyValuePair<string, string>("redirect_uri", callbackUrl)
        };

            using var content = new FormUrlEncodedContent(requestBody);

            var response = await client.PostAsync("https://github.com/login/oauth/access_token", content);

            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            JsonObject resObj = (JsonObject) JsonObject.Parse(responseBody)!;
            var accessToken = resObj["access_token"]?.GetValue<string>()??throw new Exception("expected access_token");
            var refresh_token = resObj["refresh_token"]?.GetValue<string>();
            var token_type = resObj["token_type"]?.GetValue<string>() ?? throw new Exception("expected token_type");

            //making a authorized request to github api to fetch /user data
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github+json"));
            var userInfoRespose = await client.GetAsync("https://api.github.com/user");

           
            if(!userInfoRespose.IsSuccessStatusCode)
            {
                logger.LogInformation($"Error: request to github user info failed: {userInfoRespose.StatusCode}");
                var error = await userInfoRespose.Content.ReadAsStringAsync();
                logger.LogInformation(error);
                throw new Exception("request to github user info failed");
            }
            string userInfoResposeBody = await userInfoRespose.Content.ReadAsStringAsync();

            JsonObject userInfoResposeObj = (JsonObject)JsonObject.Parse(userInfoResposeBody)!;
            var githubId = userInfoResposeObj["id"]?.GetValue<long>() ?? throw new Exception("no id provided by github");
            var githubEmail = userInfoResposeObj["email"]?.GetValue<string>();
            var githubName = userInfoResposeObj["login"]?.GetValue<string>() ?? throw new Exception("no login name by github");
            //finding existing user or creating new one
            //(todo: find existing email and suggest merging account for user who previously created an account with google)

            if (githubEmail == null)
            {
                logger.LogInformation("getting email from /emails");
                var userEmailsRespose = await client.GetAsync("https://api.github.com/user/emails");
                if (!userEmailsRespose.IsSuccessStatusCode)
                {
                    logger.LogInformation($"Error request to /emails failed: {userEmailsRespose.StatusCode}");
                    var error = await userEmailsRespose.Content.ReadAsStringAsync();
                    logger.LogInformation(error);
                    throw new Exception("request to /emails failed");
                }
                string userEmailsResposeBody = await userEmailsRespose.Content.ReadAsStringAsync();

                var userEmailsArray = JsonNode.Parse(userEmailsResposeBody)!.AsArray();
                var primaryEmail = userEmailsArray
                    .Select(node => node!.AsObject())
                    .FirstOrDefault(obj => obj["primary"]!.GetValue<bool>());

                githubEmail = primaryEmail?["email"]?.GetValue<string>();
                if (string.IsNullOrWhiteSpace(githubEmail))
                {
                    throw new Exception("cannot find primary email");
                }
            }
            string? token;
            var maybeUser = await queryUserByEmailHandler.Handle(new GetUserByEmailQuery() { GithubID = githubId.ToString() }, CancellationToken.None);

            if (maybeUser == null)
            {
                logger.LogInformation($"user doesn't exist, creating a new one");
                var newUserCommand = new CreateUserCommand() { Email = githubEmail, Name = githubName, GithubID=githubId.ToString() };
                var userId = await createUserHangler.Handle(newUserCommand, CancellationToken.None);
                logger.LogInformation($"user created with id: {userId} using github name and email");
                token = GenerateJwtToken(userId.ToString(), githubEmail, githubName);

            }
            else
            {
                var userId = maybeUser.ID;
                logger.LogInformation($"user exists with id ${userId}");
                token = GenerateJwtToken(userId.ToString(), maybeUser.Email!, maybeUser.Name);
            }

            var html = $@"
        <script>
            window.opener.postMessage({{ token: '{token}' }}, '*');
            window.close();
        </script>";

            return Content(html, "text/html");
        }

        #endregion


    }
}
