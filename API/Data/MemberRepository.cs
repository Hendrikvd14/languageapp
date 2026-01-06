using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemberRepository(AppDbContext context) : IMemberRepository
{

    public void AddDeckToMember(MemberDeck memberDeck)
    {
        context.MemberDecks.Add(memberDeck);
    }

    public async Task<MemberDto?> GetMemberByIdAsync(string memberId)
    {
        return await context.Members
                .Where(m => m.Id == memberId)
                .Select(m => new MemberDto
                {
                    Id = m.Id,
                    DisplayName = m.DisplayName,
                    Decks = m.MemberDecks.Select(md => new MemberDeckDto
                    {
                        DeckId = md.Deck.Id,
                        DeckName = md.Deck.Name,
                        StartedAt = md.StartedAt
                    }).ToList()
                })
                .FirstOrDefaultAsync();
    }

   
}
