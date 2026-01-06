using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class CardController(IUnitOfWork uow) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<CardDto>>> GetCards()
        {
            return Ok(await uow.CardRepository.GetCards());
        }

        
        [HttpGet("study/{deckId}")]
        public async Task<ActionResult<IReadOnlyList<CardDto>>> GetCardsToStudy(int deckId)
        {
            var memberId = User.GetMemberId();
            return Ok(await uow.CardRepository.GetCardsForStudy(memberId, deckId));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CardDto>> GetCardById(int id)
        {
            return Ok(await uow.CardRepository.GetCard(id));
        }
 
        [HttpPost]
        public async Task<ActionResult<CardDto>> AddCard(CardDto card)
        {
            var newCard = new Card
            {
                Back = card.Back,
                Front = card.Front,
                ExampleSentence = card.ExampleSentence
            };

            uow.CardRepository.AddCard(newCard);

            if (await uow.Complete()) return newCard.ToDto();

            return BadRequest("Failed to Add Card");

        }

        [HttpPost("progress")]
        public async Task<ActionResult<UserCardProgressDto>> AddUserCardProgress(UserCardProgressDto dto)
        {
            var memberId = User.GetMemberId();
            if (memberId == null) return Unauthorized();

            var userCardProgress = await uow.CardRepository.GetCardProgress(dto.CardId, memberId);
            if (userCardProgress != null)
            {
                if (dto.Success)
                    ProgressHelper.RegisterSuccess(userCardProgress);
                else
                    ProgressHelper.RegisterFailure(userCardProgress);

            }
            else
            {
                userCardProgress = new UserCardProgress
                {
                    CardId = dto.CardId,
                    MemberId = memberId
                };

                if (dto.Success)
                    ProgressHelper.RegisterSuccess(userCardProgress);
                else
                    ProgressHelper.RegisterFailure(userCardProgress);

                uow.CardRepository.AddProgress(userCardProgress);

            }


            if (await uow.Complete()) return Ok();
            return BadRequest("Failed to update card progress");

        }
    }
}
