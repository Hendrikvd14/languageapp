using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Member> Members { get; set; }
    public DbSet<Card> Cards { get; set; }
    public DbSet<Deck> Decks { get; set; }
    public DbSet<ReviewHistory> ReviewHistories { get; set; }
    public DbSet<UserCardProgress> UserCardProgress { get; set; }
    public DbSet<MemberDeck> MemberDecks { get; set; }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Id = "member-id", Name = "Member", NormalizedName = "MEMBER", ConcurrencyStamp = "member-stamp" },
                new IdentityRole { Id = "moderator-id", Name = "Moderator", NormalizedName = "MODERATOR", ConcurrencyStamp = "moderator-stamp" },
                new IdentityRole { Id = "admin-id", Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = "admin-stamp" }
            );


        modelBuilder.Entity<Card>()
            .HasOne(x => x.Deck)
            .WithMany(c => c.Cards)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Card>()
            .Property(c => c.Front)
            .IsRequired()
            .HasMaxLength(200);

        modelBuilder.Entity<Card>()
            .Property(c => c.Back)
            .IsRequired()
            .HasMaxLength(200);

            modelBuilder.Entity<MemberDeck>()
            .HasOne(m => m.Member)
            .WithMany(md => md.MemberDecks)
            .HasForeignKey(m => m.MemberId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MemberDeck>()
        .HasKey(x => new {x.MemberId, x.DeckId});

        modelBuilder.Entity<ReviewHistory>()
            .HasIndex(rh => new { rh.AppUserId, rh.CardId, rh.ReviewedAt });

        modelBuilder.Entity<ReviewHistory>()
            .HasIndex(rh => rh.ReviewedAt);

        modelBuilder.Entity<UserCardProgress>()
            .HasIndex(ucp => new { ucp.AppUserId, ucp.NextReviewDate });



        modelBuilder.Entity<Member>()
            .HasOne(m => m.User)
            .WithOne(u => u.Member)
            .HasForeignKey<Member>(m => m.Id)
            .OnDelete(DeleteBehavior.Cascade);


        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        var nullableDateTimeConverter = new ValueConverter<DateTime?, DateTime?>(
            v => v.HasValue ? v.Value.ToUniversalTime() : null,
            v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : null
        );

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
                else if (property.ClrType == typeof(DateTime?))
                {
                    property.SetValueConverter(nullableDateTimeConverter);
                }
            }
        }
    }

}
