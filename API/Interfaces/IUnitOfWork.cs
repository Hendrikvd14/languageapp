using System;

namespace API.Interfaces;

public interface IUnitOfWork
{
    ICardRepository CardRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}
