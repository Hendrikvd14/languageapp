using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserCardProgress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserCardProgress_AspNetUsers_AppUserId",
                table: "UserCardProgress");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "UserCardProgress",
                newName: "MemberId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCardProgress_AppUserId_NextReviewDate",
                table: "UserCardProgress",
                newName: "IX_UserCardProgress_MemberId_NextReviewDate");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCardProgress_Members_MemberId",
                table: "UserCardProgress",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserCardProgress_Members_MemberId",
                table: "UserCardProgress");

            migrationBuilder.RenameColumn(
                name: "MemberId",
                table: "UserCardProgress",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCardProgress_MemberId_NextReviewDate",
                table: "UserCardProgress",
                newName: "IX_UserCardProgress_AppUserId_NextReviewDate");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCardProgress_AspNetUsers_AppUserId",
                table: "UserCardProgress",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
