using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    public void AddDeckToMember(string memberId, int deckId)
    {
        context.MemberDecks.Add(new MemberDeck { MemberId = memberId, DeckId = deckId });
    }

    public async Task<Member?> GetMemberByIdAsync(string memberId)
    {
        return await context.Members.FindAsync(memberId);
    }

    public async Task<MemberDeck?> GetMemberWithDecksByIdAsync(string memberId)
    {
        return await context.MemberDecks
            .Include(md => md.Member)
            .Include(md => md.Deck)
            .FirstOrDefaultAsync(md => md.MemberId == memberId);
    }
}
