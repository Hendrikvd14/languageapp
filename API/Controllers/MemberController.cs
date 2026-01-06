using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MemberController(IUnitOfWork uow) : BaseApiController
    {
        [Authorize]
        [HttpGet("{id}")] //localhost:5001/api/member/bob-id
        public async Task<ActionResult<MemberDto>> GetMember(string id)
        {
            var member = await uow.MemberRepository.GetMemberByIdAsync(id);
            if (member == null) return NotFound();
            return member;
        }

        [Authorize]
        [HttpPost("deck/{id}")] //localhost:5001/api/member/deck/1
        public async Task<ActionResult> AddDeckToMember(int id)
        {
            var deck = await uow.DeckRepository.GetDeck(id);
            var memberId = User.GetMemberId();
            if (deck == null || memberId == null) return NotFound();
            var memberDeck = new MemberDeck
            {
                DeckId = deck.Id,
                MemberId = memberId
            };

            uow.MemberRepository.AddDeckToMember(memberDeck);

            if(await uow.Complete()) return Ok("Deck added to member"); 
            return BadRequest("Problem adding deck to member");
        }



      
    }
}
