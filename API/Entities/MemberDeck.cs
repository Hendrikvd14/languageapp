using System;

namespace API.Entities;

public class MemberDeck
{ 
    public string MemberId { get; set; } = null!;
    public Member Member { get; set; } = null!;

    public int DeckId { get; set; }
    public Deck Deck { get; set; } = null!;

    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
}
