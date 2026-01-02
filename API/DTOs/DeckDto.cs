using System;
using System.Text.Json.Serialization;

namespace API.DTOs;

public class DeckDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    [JsonPropertyName("name")]
    public required string Name { get; set; }
    [JsonPropertyName("sourceLanguage")]
    public required string SourceLanguage { get; set; }
    [JsonPropertyName("targetLanguage")]
    public required string TargetLanguage { get; set; }
    [JsonPropertyName("cards")]
    public List<CardDto> Cards { get; set; } = [];
}
