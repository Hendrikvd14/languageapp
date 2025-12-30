using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRelationalModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ReviewHistories_UserId_CardId_ReviewedAt",
                table: "ReviewHistories");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ReviewHistories");

            migrationBuilder.DropColumn(
                name: "SourceLanguage",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "TargetLanguage",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "ReviewHistories",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MemberId",
                table: "Decks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceLanguage",
                table: "Decks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TargetLanguage",
                table: "Decks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewHistories_AppUserId_CardId_ReviewedAt",
                table: "ReviewHistories",
                columns: new[] { "AppUserId", "CardId", "ReviewedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Decks_MemberId",
                table: "Decks",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Decks_Members_MemberId",
                table: "Decks",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Decks_Members_MemberId",
                table: "Decks");

            migrationBuilder.DropIndex(
                name: "IX_ReviewHistories_AppUserId_CardId_ReviewedAt",
                table: "ReviewHistories");

            migrationBuilder.DropIndex(
                name: "IX_Decks_MemberId",
                table: "Decks");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "ReviewHistories");

            migrationBuilder.DropColumn(
                name: "MemberId",
                table: "Decks");

            migrationBuilder.DropColumn(
                name: "SourceLanguage",
                table: "Decks");

            migrationBuilder.DropColumn(
                name: "TargetLanguage",
                table: "Decks");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ReviewHistories",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SourceLanguage",
                table: "Cards",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TargetLanguage",
                table: "Cards",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewHistories_UserId_CardId_ReviewedAt",
                table: "ReviewHistories",
                columns: new[] { "UserId", "CardId", "ReviewedAt" });
        }
    }
}
