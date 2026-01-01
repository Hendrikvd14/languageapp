using System;
using API.Interfaces;

namespace API.Data;

public class UnitOfWork(AppDbContext context) : IUnitOfWork
{
    private ICardRepository? _cardRepository;
    private IMemberRepository? _memberRepository;
    private IDeckRepository? _deckRepository;
    public ICardRepository CardRepository => _cardRepository ??= new CardRepository(context);
    public IMemberRepository MemberRepository => _memberRepository ??= new MemberRepository(context);
    public IDeckRepository DeckRepository => _deckRepository ??= new DeckRepository(context);

    public async Task<bool> Complete()
    {
        try
        {
            return await context.SaveChangesAsync() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("An error occured while saving changes", ex);
        }
    }

    public bool HasChanges()
    {
        return context.ChangeTracker.HasChanges();
    }
}
