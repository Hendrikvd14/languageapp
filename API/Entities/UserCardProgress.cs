using System;

namespace API.Entities;

public class UserCardProgress
{
    public int Id { get; set; }
    public DateTime LastReviewedDate { get; set; }
    public DateTime NextReviewDate { get; set; }
    public int Interval { get; set; }
    public int Repetition { get; set; }
    public double EaseFactor { get; set; }
    public CardLearningState State { get; set; } = CardLearningState.New;
    public bool IsNew { get; set; }

    //navigation props
    public string MemberId { get; set; } = null!;
    public Member Member { get; set; } = null!;
    public int CardId { get; set; }
    public Card Card { get; set; } = null!;
}
