using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedMemberDeck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Decks_Members_MemberId",
                table: "Decks");

            migrationBuilder.DropIndex(
                name: "IX_Decks_MemberId",
                table: "Decks");

            migrationBuilder.DropColumn(
                name: "MemberId",
                table: "Decks");

            migrationBuilder.CreateTable(
                name: "MemberDecks",
                columns: table => new
                {
                    MemberId = table.Column<string>(type: "TEXT", nullable: false),
                    DeckId = table.Column<int>(type: "INTEGER", nullable: false),
                    StartedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberDecks", x => new { x.MemberId, x.DeckId });
                    table.ForeignKey(
                        name: "FK_MemberDecks_Decks_DeckId",
                        column: x => x.DeckId,
                        principalTable: "Decks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MemberDecks_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MemberDecks_DeckId",
                table: "MemberDecks",
                column: "DeckId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MemberDecks");

            migrationBuilder.AddColumn<string>(
                name: "MemberId",
                table: "Decks",
                type: "TEXT",
                nullable: true);

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
    }
}
