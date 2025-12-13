using System;

namespace API.Entities;

public class Card
{
    public int Id { get; set; }
    public string Front { get; set; } = null!;
    public string Back { get; set; } = null!;
    public string? ExampleSentence { get; set; }
    
    public string SourceLanguage { get; set; }= null!;
    public string TargetLanguage { get; set; }= null!;

    // navigation props
    public int DeckId { get; set; }
    public Deck Deck { get; set; } = null!;

}
