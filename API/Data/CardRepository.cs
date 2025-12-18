using System;
using System.Net.Mime;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class CardRepository(AppDbContext context) : ICardRepository
{
    public void AddCard(Card card)
    {
        context.Cards.Add(card);
    }

    public void DeleteCard(Card card)
    {
        context.Cards.Remove(card);
    }

    public async Task<Card?> GetCard(int id)
    {
        return await context.Cards.FindAsync(id);
    }

    public async Task<IReadOnlyList<CardDto>> GetCards()
    {
        return await context.Cards
        .Select(card => new CardDto
        {
            Id = card.Id,
            Front = card.Front,
            Back = card.Back,
            ExampleSentence = card.ExampleSentence,
            SourceLanguage = card.SourceLanguage,
            TargetLanguage = card.TargetLanguage
        })
        .ToListAsync();
    }
}
