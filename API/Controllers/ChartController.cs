using API.Data.Migrations;
using API.DTOs;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ChartController(IUnitOfWork uow) : BaseApiController
    {
        [HttpGet("deck/{deckId}/progress")]
        public async Task<ActionResult<ChartDto>> GetProgess(int deckId)
        {
            var memberId = User.GetMemberId();
            if (memberId == null) return Unauthorized();

            return await uow.ChartRepository.GetDeckProgressChartAsync(memberId, deckId);
            
        }

    }
}
