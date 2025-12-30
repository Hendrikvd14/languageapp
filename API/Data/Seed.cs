using System;
using System.Text.Json;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedCards(AppDbContext context)
    {

        using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            var deck = await context.Decks
                .Include(d => d.Cards)
                .FirstOrDefaultAsync(d => d.Name == "Spaans");



            if (deck != null && deck.Cards.Any())
            {
                Console.WriteLine($"Deck 'Spaans' already has {deck.Cards.Count} cards");
                return;
            }

            if (deck == null)
            {
                deck = new Deck { Name = "Spaans", SourceLanguage = "Engels", TargetLanguage = "Spaans" };
                context.Decks.Add(deck);
            }

            var cardData = await File.ReadAllTextAsync("Data/CardSeedData.json");
            var cards = JsonSerializer.Deserialize<List<CardDto>>(cardData);



            if (cards == null || cards.Count == 0)
            {
                Console.WriteLine("No cards in seed data");
                return;
            }


            foreach (var cardDto in cards)
            {
                context.Cards.Add(new Card
                {
                    Front = cardDto.Front,
                    Back = cardDto.Back,
                    ExampleSentence = cardDto.ExampleSentence,
                    Deck = deck // ← Navigation property is beter dan DeckId
                });
            }


            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            Console.WriteLine($"Seeded {cards.Count} cards for deck '{deck.Name}'");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            Console.WriteLine($"Error seeding cards: {ex.Message}");
            throw;
        }
    }
}
