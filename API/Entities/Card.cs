using System;

namespace API.Entities;

public class Card
{
    public int Id { get; set; }
    public string Front { get; set; } = null!;
    public string Back { get; set; } = null!;
    public string? ExampleSentence { get; set; }
    
    

    // navigation props
    public int DeckId { get; set; }
    public Deck Deck { get; set; } = null!;

}
