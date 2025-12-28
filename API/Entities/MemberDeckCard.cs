using System;

namespace API.Entities;

public class MemberDeckCard
{
    public string? MemberId { get; set; }
    public Member Member { get; set; } = null!;

    public int CardId { get; set; }
    public Card Card { get; set; } = null!;

    public int DeckId { get; set; }
    public Deck Deck { get; set; } = null!;

    public bool IsLearned { get; set; } = false;
    public DateTime? LastStudied { get; set; }
    public DateTime? NextReview { get; set; }
}
