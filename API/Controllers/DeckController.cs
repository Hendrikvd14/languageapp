using API.DTOs;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DeckController(IUnitOfWork uow) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<DeckDto>>> GetCards()
        {
            return Ok(await uow.DeckRepository.GetDecks());
        }

        [Authorize]
        [HttpGet("notlinked")] //localhost:5001/api/deck/notlinked
        public async Task<ActionResult<IReadOnlyList<DeckDto>>> GetDecksNotLinkedToUser()
        {
            var id = User.GetMemberId();
            return Ok(await uow.DeckRepository.GetDecksNotLinkedToUser(id));

        }
        [Authorize]
        [HttpGet("linked")] //localhost:5001/api/deck/linked
        public async Task<ActionResult<IReadOnlyList<DeckDto>>> GetDecksLinkedToUser()
        {
            var id = User.GetMemberId();
            return Ok(await uow.DeckRepository.GetDecksLinkedToUser(id));

        }
    }
}
