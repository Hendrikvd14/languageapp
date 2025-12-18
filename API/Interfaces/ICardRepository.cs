using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ICardRepository
{
    void AddCard(Card card);
    void DeleteCard(Card card);
    Task<Card?> GetCard(int id);
    Task<IReadOnlyList<CardDto>> GetCards();
}
