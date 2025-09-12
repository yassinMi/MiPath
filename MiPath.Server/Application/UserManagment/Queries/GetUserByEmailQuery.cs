namespace MiPath.Server.Application.UserManagement.Queries
{
    /// <summary>
    /// provide only one of the properties
    /// </summary>
    public class GetUserByEmailQuery
    {
        public string? Email { get; set; }
        public string? GoogleID { get; set; }
        public string? GithubID { get; set; }


    }
}
