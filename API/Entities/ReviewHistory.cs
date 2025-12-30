using System;

namespace API.Entities;

public class ReviewHistory
{
    public int Id { get; set; }
    public string? AppUserId { get; set; }
    public int CardId { get; set; }
    public DateTime ReviewedAt { get; set; }
    public bool WasCorrect { get; set; }
    public ReviewQuality QualityRating { get; set; }

}
