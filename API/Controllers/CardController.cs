using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CardController(IUnitOfWork uow) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<CardDto>>> GetCards()
        {
            return Ok(await uow.CardRepository.GetCards());
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
    }
}
