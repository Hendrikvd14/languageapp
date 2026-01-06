using System;
using API.Entities;

namespace API.Interfaces;

public interface IDeckRepository
{
    void AddDeck(Deck deck);
    void DeleteDeck(Deck deck);
    Task<Deck?> GetDeck(int id);
    Task<IReadOnlyList<Deck>> GetDecks();
    Task<IReadOnlyList<Deck>> GetDecksNotLinkedToUser(string id);
    Task<IReadOnlyList<Deck>> GetDecksLinkedToUser(string id);
}
