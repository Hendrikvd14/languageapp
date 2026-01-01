using System;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IMemberRepository
{
    Task<Member?> GetMemberByIdAsync(string memberId);
    Task<MemberDeck?> GetMemberWithDecksByIdAsync(string memberId);
    void AddDeckToMember(string memberId, int deckId);

}
