using System;
using API.Interfaces;

namespace API.Data;

public class UnitOfWork(AppDbContext context) : IUnitOfWork
{
    private ICardRepository? _cardRepository;
    public ICardRepository CardRepository => _cardRepository ??= new CardRepository(context);

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
