using System;

namespace API.Entities;

public class UserCardProgress
{
    public int Id { get; set; }
    public DateTime NextReviewDate { get; set; }
    public int Interval { get; set; }
    public int Repetition { get; set; }
    public double EaseFactor { get; set; }
    public bool IsNew { get; set; }

    //navigation props
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
    public int CardId { get; set; }
    public Card Card { get; set; } = null!;
}
