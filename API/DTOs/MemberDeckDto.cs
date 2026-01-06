using System;

namespace API.DTOs;

public class MemberDeckDto
{
    public int DeckId { get; set; }
    public string DeckName { get; set; } = null!;
    public DateTime StartedAt { get; set; }
}
