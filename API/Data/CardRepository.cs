using System;
using System.Net.Mime;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class CardRepository(AppDbContext context) : ICardRepository
{
    public void AddCard(Card card)
    {
        context.Cards.Add(card);
    }

    public void AddProgress(UserCardProgress userCardProgress)
    {
        context.UserCardProgress.Add(userCardProgress);
    }



    public void DeleteCard(Card card)
    {
        context.Cards.Remove(card);
    }

    public async Task<Card?> GetCard(int id)
    {
        return await context.Cards.FindAsync(id);
    }

    public async Task<UserCardProgress?> GetCardProgress(int cardId, string memberId)
    {
        return await context.UserCardProgress.Where(ucp => ucp.CardId == cardId && ucp.MemberId == memberId).FirstOrDefaultAsync();
    }

    public async Task<IReadOnlyList<CardDto>> GetCards()
    {
        return await context.Cards
        .Select(card => new CardDto
        {
            Id = card.Id,
            Front = card.Front,
            Back = card.Back,
            ExampleSentence = card.ExampleSentence
        })
        .ToListAsync();
    }

    public async Task<IReadOnlyList<CardDto>> GetCardsForStudy(string memberId, int deckId)
    {

        var query = context.Cards
            .Where(c => c.DeckId == deckId)
            .Where(c => !context.UserCardProgress.Any(p => p.MemberId == memberId && p.CardId == c.Id)
                     || context.UserCardProgress.Any(p => p.MemberId == memberId && p.CardId == c.Id && p.NextReviewDate <= DateTime.UtcNow))
            .Select(c => new CardDto
            {
                Id = c.Id,
                Front = c.Front,
                Back = c.Back,
                ExampleSentence = c.ExampleSentence
            });

        
        string sql = QueryHelper.LinqToQuery(query);
        Console.WriteLine(sql);


        var cards = await query.ToListAsync();


        return cards;
    }
}
