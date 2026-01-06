using System;

namespace API.DTOs;

public class MemberDto
{
    public string Id { get; set; } = null!;
    public string DisplayName { get; set; }
    public ICollection<MemberDeckDto> Decks { get; set; }
}
