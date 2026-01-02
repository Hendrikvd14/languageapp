using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DeckRepository(AppDbContext context) : IDeckRepository
{
    public void AddDeck(Deck deck)
    {
        context.Decks.Add(deck);
    }

    public void DeleteDeck(Deck deck)
    {
        context.Decks.Remove(deck);
    }

    public async Task<Deck?> GetDeck(int id)
    {
        return await context.Decks.FindAsync(id);
    }

    public async Task<IReadOnlyList<Deck>> GetDecks()
    {
        return await context.Decks.ToListAsync();
    }
}
