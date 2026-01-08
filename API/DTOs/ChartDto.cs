using System;

namespace API.DTOs;

public class ChartDto
{
    public ChartType Type { get; set; }
    public string Title { get; set; } = null!;
    public IList<string> Labels { get; set; } = [];
    public IList<ChartDatasetDto> Datasets { get; set; } = [];
}

public class ChartDatasetDto
{
    public string Label { get; set; } = null!;
    public IList<int> Data { get; set; } = [];
    public IList<string> BackgroundColors { get; set; } = [];
}

public enum ChartType
{
    Pie,
    Bar,
    Line
}
