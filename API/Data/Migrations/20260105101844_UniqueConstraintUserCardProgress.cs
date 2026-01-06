using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UniqueConstraintUserCardProgress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserCardProgress_MemberId_NextReviewDate",
                table: "UserCardProgress");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastReviewedDate",
                table: "UserCardProgress",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "UserCardProgress",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_UserCardProgress_MemberId_NextReviewDate",
                table: "UserCardProgress",
                columns: new[] { "MemberId", "NextReviewDate" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserCardProgress_MemberId_NextReviewDate",
                table: "UserCardProgress");

            migrationBuilder.DropColumn(
                name: "LastReviewedDate",
                table: "UserCardProgress");

            migrationBuilder.DropColumn(
                name: "State",
                table: "UserCardProgress");

            migrationBuilder.CreateIndex(
                name: "IX_UserCardProgress_MemberId_NextReviewDate",
                table: "UserCardProgress",
                columns: new[] { "MemberId", "NextReviewDate" });
        }
    }
}
