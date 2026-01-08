using System;

namespace API.Interfaces;

public interface IUnitOfWork
{
    ICardRepository CardRepository { get; }
    IMemberRepository MemberRepository { get; } 
    IDeckRepository DeckRepository { get; }   
    IChartRepository ChartRepository { get; }   
    Task<bool> Complete();
    bool HasChanges();
}
