using API.DTOs;
using API.Interfaces;
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
    }
}
