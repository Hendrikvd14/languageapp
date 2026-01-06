using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ICardRepository
{
    void AddCard(Card card);
    void AddProgress(UserCardProgress userCardProgress);
    void DeleteCard(Card card);
    Task<Card?> GetCard(int id);
    Task<IReadOnlyList<CardDto>> GetCardsForStudy(string memberId, int deckId);
    Task<UserCardProgress?> GetCardProgress(int cardId, string memberId);
    Task<IReadOnlyList<CardDto>> GetCards();
}
