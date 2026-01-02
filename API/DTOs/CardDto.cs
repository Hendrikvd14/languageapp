using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.DTOs;

public class CardDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    [JsonPropertyName("front")]
    public required string Front { get; set; }
    [JsonPropertyName("back")]
    public  required string Back { get; set; }
    [JsonPropertyName("exampleSentence")]
    public string? ExampleSentence { get; set; }
    [JsonPropertyName("sourceLanguage")]
    public required string SourceLanguage { get; set; }
    [JsonPropertyName("targetLanguage")]
    public required string TargetLanguage { get; set; }
}
