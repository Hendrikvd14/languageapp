using System;
using API.Entities;

namespace API.Helpers;

public static class ProgressHelper
{

    public static void RegisterFailure(UserCardProgress progress)
    {
        progress.Repetition = 0;
        progress.Interval = 0;
        progress.EaseFactor = Math.Max(1.3, progress.EaseFactor - 0.2);
        progress.NextReviewDate = DateTime.UtcNow;
        progress.LastReviewedDate = DateTime.UtcNow;
        progress.State = CardLearningState.Learning;
    }

    public static void RegisterSuccess(UserCardProgress progress)
    {
        progress.Repetition++;

        if (progress.Repetition == 1)
            progress.Interval = 1;
        else if (progress.Repetition == 2)
            progress.Interval = 6;
        else
            progress.Interval = (int)(progress.Interval * progress.EaseFactor);

        progress.EaseFactor += 0.1;
        progress.LastReviewedDate = DateTime.UtcNow;
        progress.NextReviewDate = DateTime.UtcNow.AddDays(progress.Interval);
        progress.State = CardLearningState.Review;
    }

    /// <summary>
    /// Optioneel: een helper voor “lapsed” kaarten die lang niet zijn herhaald.
    /// Kan gebruikt worden om Interval en Repetition te resetten bij hernieuwd leren.
    /// </summary>
    public static void RegisterLapse(UserCardProgress progress)
    {
        progress.Repetition = 1;
        progress.Interval = 1;
        progress.NextReviewDate = DateTime.UtcNow.AddDays(1);
        progress.State = CardLearningState.Learning;
    }
}
