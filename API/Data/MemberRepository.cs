using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    public async Task<Member?> GetMemberByIdAsync(string id)
{
    return await context.Members
        .Include(m => m.MemberDecks)
            .ThenInclude(md => md.Deck)
        .FirstOrDefaultAsync(m => m.Id == id);
}


    
}
