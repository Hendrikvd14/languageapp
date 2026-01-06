using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedUserCardProgress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserCardProgress_MemberId_NextReviewDate",
                table: "UserCardProgress");

            migrationBuilder.CreateIndex(
                name: "IX_UserCardProgress_MemberId_CardId",
                table: "UserCardProgress",
                columns: new[] { "MemberId", "CardId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserCardProgress_MemberId_CardId",
                table: "UserCardProgress");

            migrationBuilder.CreateIndex(
                name: "IX_UserCardProgress_MemberId_NextReviewDate",
                table: "UserCardProgress",
                columns: new[] { "MemberId", "NextReviewDate" },
                unique: true);
        }
    }
}
