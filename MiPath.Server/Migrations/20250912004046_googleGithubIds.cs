using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiPath.Server.Migrations
{
    /// <inheritdoc />
    public partial class googleGithubIds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GithubID",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GoogleID",
                table: "Users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GithubID",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "GoogleID",
                table: "Users");
        }
    }
}
