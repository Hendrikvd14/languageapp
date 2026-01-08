using System;
using API.DTOs;

namespace API.Interfaces;

public interface IChartRepository
{
    Task<ChartDto> GetDeckProgressChartAsync(string memberId, int deckId);
}
