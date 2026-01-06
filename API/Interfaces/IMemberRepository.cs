using System;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IMemberRepository
{
    Task<MemberDto?> GetMemberByIdAsync(string memberId);
    void AddDeckToMember(MemberDeck memberDeck);

}
