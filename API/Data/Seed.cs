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

            /* if (deck == null)
            {
                deck = new Deck { Name = "Spaans", SourceLanguage = "Engels", TargetLanguage = "Spaans" };
                context.Decks.Add(deck);
                context.Decks.Add(new Deck { Name = "Italiaans", SourceLanguage = "Engels", TargetLanguage = "Italiaans" });
                context.Decks.Add(new Deck { Name = "Duits", SourceLanguage = "Engels", TargetLanguage = "Duits" });
                context.Decks.Add(new Deck { Name = "Frans", SourceLanguage = "Engels", TargetLanguage = "Frans" });
                context.Decks.Add(new Deck { Name = "Portugees", SourceLanguage = "Engels", TargetLanguage = "Portugees" });
            } */

            //var cardData = await File.ReadAllTextAsync("Data/CardSeedData.json");
            //var cards = JsonSerializer.Deserialize<List<CardDto>>(cardData);

            var basePath = Directory.GetCurrentDirectory();
            var filePath = Path.Combine(basePath, "Data", "CardSeedData.json");


            if (!File.Exists(filePath))
            {
                Console.WriteLine($"Seed file not found: {filePath}");
                return;
            }

            var data = await File.ReadAllTextAsync(filePath);

            var decksData = JsonSerializer.Deserialize<List<DeckDto>>(data);
            if (decksData == null) return;
            foreach (var deckData in decksData)
            {
                var newDeck = new Deck
                {
                    Name = deckData.Name,
                    SourceLanguage = deckData.SourceLanguage,
                    TargetLanguage = deckData.TargetLanguage
                };
                context.Decks.Add(newDeck);

                foreach (var card in deckData.Cards)
                {
                    context.Cards.Add(new Card
                    {
                        Front = card.Front,
                        Back = card.Back,
                        ExampleSentence = card.ExampleSentence,
                        Deck = newDeck // ← Navigation property is beter dan DeckId
                    });
                }
            }


            /* var cards = JsonSerializer.Deserialize<List<CardDto>>(data);


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
            } */


            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            Console.WriteLine($"Seeded {context.Decks.Count()} decks");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            Console.WriteLine($"Error seeding cards: {ex.Message}");
            throw;
        }
    }
}
