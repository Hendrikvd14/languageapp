using System;

namespace API.Interfaces;

public interface IUnitOfWork
{
    ICardRepository CardRepository { get; }
    IMemberRepository MemberRepository { get; }   
    Task<bool> Complete();
    bool HasChanges();
}
