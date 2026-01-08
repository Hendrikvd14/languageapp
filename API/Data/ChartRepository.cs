using System;
using API.DTOs;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ChartRepository(AppDbContext context) : IChartRepository
{
    public async Task<ChartDto> GetDeckProgressChartAsync(string memberId, int deckId)
    {
        var progressCounts = await context.UserCardProgress
            .Where(ucp =>
                ucp.MemberId == memberId &&
                ucp.Card.DeckId == deckId)
            .GroupBy(ucp => ucp.State)
            .Select(g => new
            {
                State = g.Key,
                Count = g.Count()
            }).ToListAsync();

        return new ChartDto
        {
            Type = ChartType.Pie,
            Title = "Leerprogressie",
            Labels = progressCounts.Select(x => x.State.ToString()).ToList(),
            Datasets =
            {
                new ChartDatasetDto
                {
                    Label = "Cards",
                    Data = progressCounts.Select(x => x.Count).ToList(),
                    BackgroundColors =
                    {
                        "#10B981", // geleerd
                        "#F59E0B", // bezig
                        "#EF4444"  // nieuw
                    }
                }
            }
        };
    }
}
