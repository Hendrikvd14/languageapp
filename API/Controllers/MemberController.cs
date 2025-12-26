using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MemberController(IUnitOfWork uow) : BaseApiController
    {
        [Authorize]
        [HttpGet("{id}")] //localhost:5001/api/members/bob-id
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await uow.MemberRepository.GetMemberByIdAsync(id);
            if (member == null) return NotFound();
            return member;
        }
    }
}
