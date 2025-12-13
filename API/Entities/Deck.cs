using System;

namespace API.Entities;

public class Deck
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    // navigation props
    public ICollection<Card> Cards { get; set; } = [];
}
