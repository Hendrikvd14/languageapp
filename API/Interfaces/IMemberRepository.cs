using System;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IMemberRepository
{
    Task<Member?> GetMemberByIdAsync(string id);
}
